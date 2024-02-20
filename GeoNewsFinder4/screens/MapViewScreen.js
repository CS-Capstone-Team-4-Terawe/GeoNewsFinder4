
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Modal, Dimensions } from 'react-native';
import { Circle } from 'react-native-maps';
import { getDistance } from 'geolib';
import { API } from 'aws-amplify';
import MapView from '../components/MapView';
import BottomSheet from '../components/BottomSheet'; 
import SearchBar from '../components/SearchBar';
import LoginButton from '../components/LoginButton';

const PROVIDER_GOOGLE = 'google';

const { width:DEVICE_WIDTH, height:DEVICE_HEIGHT } = Dimensions.get('window');
const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;

const INITIAL_LOCATION = {
  latitude: 26.385784,  
  longitude: -98.8280,
  latitudeDelta: 90,
  longitudeDelta: 90 * ASPECT_RATIO
}  

const MapViewScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHotspotId, setSelectedHotspotId] = useState(null);
  const [hotspots, setHotspots] = useState([]);

  // temp articles 
  // Assuming articles is an array containing the data
  const articles_dict = [
    { title: 'Article 1', location_tags: 'New York', topic_tags: ['technology', 'business'] },
    { title: 'Article 2', location_tags: 'San Francisco', topic_tags: ['travel', 'culture'] },
    { title: 'Article 3', location_tags: 'Miami', topic_tags: ['food', 'culture'] },
    { title: 'Article 4', location_tags: 'Denver', topic_tags: ['travel', 'food'] },
    { title: 'Article 5', location_tags: 'Denver', topic_tags: ['travel', 'food'] },
    { title: 'Article 6', location_tags: 'New York', topic_tags: ['travel'] },
    { title: 'Article 7', location_tags: 'New York', topic_tags: ['travel'] },
    { title: 'Article 8', location_tags: 'Miami', topic_tags: ['food'] },
    // Add more articles as needed
  ];

  // Count the frequency of location for all articles stored 
  const countOccurences = (article_db) => {
    const loc_count = {}; // dict storing all location + freq
    article_db.forEach(article => {
      const trimmedLocation = article.location_tags.trim().toLowerCase(); // extract loc
      // if unseen loc, create new entry other inc count
      if (loc_count[trimmedLocation]) {
        loc_count[trimmedLocation]++;
      } else {
        loc_count[trimmedLocation] = 1;
      }
    });
    console.log(loc_count);
    return loc_count;
  };

    // Get coordinates for a given location [FUTURE: geocoding API call ]
    const getCoordinatesForLocation = (loc) => {
      // Placeholder coordinates for demo purposes (predetermined)
      const coordMap = {
        'new york': { latitude: 40.7128, longitude: -74.0060 },
        'san francisco': { latitude: 37.7749, longitude: -122.4194 },
        'los angeles': { latitude: 34.0522, longitude: -118.2437 },
        'san diego': { latitude: 32.7157, longitude: -117.1611 },
        'miami': { latitude: 25.7617, longitude: -80.1918 },
        'denver': { latitude: 39.7392, longitude: -104.9903 },
        'chicago': { latitude: 41.8781, longitude: -87.6298 },
        // Add more as needed
      };
      return coordMap[loc] || { latitude: 0, longitude: 0 };
    };
  

  // function to create hotspot object based on the location freequency
  const generateHotspotObject = () => {
    const location_freq = countOccurences(articles_dict); // articles is a dict object
    const formattedHotspots = Object.entries(location_freq).map(([loc_name, count]) => ({
      _id: loc_name.toLowerCase(),
      radius: count * 100000,
      strokeWidth: 2,
      ...getCoordinatesForLocation(loc_name),
    }));
    setHotspots(formattedHotspots);
    console.log(formattedHotspots)
  };

  useEffect(() => {
    generateHotspotObject();
  }, []);

  const toggleModal = (hotspotId) => {
    setSelectedHotspotId(hotspotId);
    setModalVisible(!isModalVisible);
  };

  const [searchText, setSearchText] = useState('');

  const handleSearchText = (val) => {
    setSearchText(val.nativeEvent.text);
    console.log(val.nativeEvent.text);
  };

  const handleButtonTap = async () => {
    try {
      // fetches the entire Articles table - AWS dynamodb. view amplify/backend/function/ArticlesLambda
      const responseData = await API.get('articlesApi', '/articles');
      console.log(responseData);
    } catch (e) {
      console.error('error fetching articles:', e);
    }
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        region={INITIAL_LOCATION}
        onPress={(event) => {
          const coordinates = event.nativeEvent.coordinate;

          // onPress for hot spots
          // Workaround from issue where MapView.Circle cannot use onPress prop: 
          //    https://github.com/react-native-maps/react-native-maps/issues/1409
          hotspots.map(hotspot => {
              const distance = getDistance(
                  { latitude: coordinates.latitude, longitude: coordinates.longitude },
                  { latitude: hotspot.latitude, longitude: hotspot.longitude }
              );
  
              if (distance <= hotspot.radius) {
                toggleModal(hotspot._id);
              }
          })
      }}
      >
        {hotspots.map(hotspot => (
            <Circle  
              key={hotspot._id}
              center={{
                latitude: hotspot.latitude,
                longitude: hotspot.longitude
              }}
              radius={ hotspot.radius }
              strokeWidth={ hotspot.strokeWidth }
              strokeColor='rgba(255, 0, 0, 0.4)'
              fillColor='rgba(255, 0, 0, 0.4)'
            />
        ))
        }
      </MapView>

      <View style={styles.searchBarContainer}>
        <SearchBar onSearchSubmit={handleSearchText}></SearchBar>
      </View>

      <View style={styles.loginButtonContainer}>
        <LoginButton></LoginButton>
      </View>
      {/* <Button title="test" onPress={handleButtonTap}/> */}

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <BottomSheet closeModal={toggleModal} hotspotId={selectedHotspotId} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 300,
    left: 100,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 10,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  loginButtonContainer: {
    position: 'absolute',
    bottom: 60,
    right: 30,
    alignItems: 'center', 
    justifyContent: 'center',
  }
});

export default MapViewScreen;

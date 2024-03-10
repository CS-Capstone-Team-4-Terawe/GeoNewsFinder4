import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Modal, Dimensions } from 'react-native';
import { Marker, Circle } from 'react-native-maps';
import { getDistance } from 'geolib';
import MapView from "react-native-map-clustering";
// import MapView from '../components/MapView';
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

const MapViewScreen = ({route, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHotspotId, setSelectedHotspotId] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [articles, setArticles] = useState([]);
  const [groupedLocations, setGroupedLocations] = useState({});

  const createArticleObjects = (data) => {
    const articlesObjects = data.hits.hits.map(hit => {
      // parsing coordinates from str to numbers
        var coordinates = hit._source.Coordinates;
        var [latStr, longStr] = coordinates.replace(/[()]/g, '').split(','); // Split the string by comma into seperate values
        var lat_parse = parseFloat(latStr.trim());
        var long_parse = parseFloat(longStr.trim());
    
        return {
            coord: coordinates, //coordinates combined as (lat, long)
            article_id: hit._id, // article id by open search
            title: hit._source.Title, // title of article
            urlToImage: hit._source.ImageURL, // image url
            url: hit._source.URL, // article url 
            latitude: lat_parse, // using parsed value of latitude
            longitude: long_parse, // using parsed value of longtitude
        };
      });
    return articlesObjects
  }

  // Function to group articles based on their latitude and longitude
  const groupArticlesByCoord = (articles) => {
    const locations = {};
    articles.forEach(article => {
      const key = `${article.latitude},${article.longitude}`;
      if (locations[key]) {
        locations[key].push(article);
      } else {
        locations[key] = [article];
      }
    });
    return locations;
  };

  // Function to generate hotspots based on the grouped locations
  const generateHotspotObject = (articles) => {
    const groupedLocations = groupArticlesByCoord(articles); // grouping articles by coordinate
    setGroupedLocations(groupedLocations); // setting all the grouped location so that can "import" articles in tile view
    const formattedHotspots = Object.entries(groupedLocations).map(([location, articles]) => {
      const [latitude, longitude] = location.split(',').map(parseFloat);
      return {
        _id: location,
        latitude,
        longitude,
        radius: articles.length * 100000, // Adjust the radius calculation as needed
        strokeWidth: 2,
      };
    });
    setHotspots(formattedHotspots);
  };

  const handleSearchText = (val) => {
    queryText = val.nativeEvent.text;
    const apiUrl = `https://2sn9j78km9.execute-api.us-west-1.amazonaws.com/demo/articles?query_text=${encodeURIComponent(queryText)}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const articlesFromApi = createArticleObjects(data)   
      setArticles(articlesFromApi); // setting state with the article dictionary format
      generateHotspotObject(articlesFromApi); // Regenerate hotspots based on the new articles
  })
  .catch(error => {
    console.error('Error:', error);
  }); 
  };

  useEffect(() => {
    // Check if apiData is available and set articles
    if (route.params?.apiData) {
      const articlesObjects = createArticleObjects(route.params.apiData)
      setArticles(articlesObjects);
    }
  }, [route.params?.apiData]);

  useEffect(() => {
    // Only generate hotspots if articles array is populated
    if (articles.length > 0) {
      generateHotspotObject(articles);
    }
  }, [articles]);

  const toggleModal = (hotspotId) => {
    setSelectedHotspotId(hotspotId);
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE} 
        region={INITIAL_LOCATION}
        onClusterPress={(event) => {
          // should show info of what markers are in the cluster -- refer to react-native-map-clustering repo
          console.log("event:" + event);
        }} 
      >
        {hotspots.map(hotspot => (
            <Marker  
            // todo: make custom marker? (react-native-map-clustering only supports markers -- not circles)
              key={hotspot._id}
              coordinate={{
                latitude: hotspot.latitude,
                longitude: hotspot.longitude
              }}
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
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
         <BottomSheet closeModal={toggleModal} hotspotId={selectedHotspotId} groupedLocations={groupedLocations} />
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
  },
});

export default MapViewScreen;
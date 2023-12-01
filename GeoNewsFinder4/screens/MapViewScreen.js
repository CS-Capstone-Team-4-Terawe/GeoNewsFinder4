import React, { useState } from 'react';
import { View, StyleSheet, Button, Modal, Dimensions } from 'react-native';
import { Circle } from 'react-native-maps';
import { getDistance } from 'geolib';
import MapView from '../components/MapView';
import BottomSheet from '../components/BottomSheet'; 
import SearchBar from '../components/SearchBar';

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

  const [hotspots, setHotspots] = useState([
    {
      _id: 'san diego',
      radius: 200 * 1000, // radius parameters are in meters.
      strokeWidth: 2,
      latitude: 34.413,
      longitude: -119.86
    },
    {
      _id: 'nyc',
      radius: 300 * 1000,
      strokeWidth: 2,
      latitude: 40.7486,
      longitude: -73.986
    },
    {
      _id: 'houston',
      radius: 400 * 1000,
      strokeWidth: 2,
      latitude: 30.092,
      longitude: -95.346
    }
  ]);

  const toggleModal = (hotspotId) => {
    setSelectedHotspotId(hotspotId);
    setModalVisible(!isModalVisible);
  };

  const [searchText, setSearchText] = useState('');

  const handleSearchText = (val) => {
    setSearchText(val.nativeEvent.text);
    console.log(val.nativeEvent.text);
  };

  // const clearSearchText = () => {
  //   onSearchSubmit('');
  //   console.log("clearing?");
  // };

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
});

export default MapViewScreen;
import React, { useState } from 'react';
import { View, StyleSheet, Button, Modal } from 'react-native';
import MapView from '../components/mapview';
import BottomSheet from '../components/bottomSheet'; 


const PROVIDER_GOOGLE = 'google';
const INITIAL_LOCATION = {
  latitude: 34.413,
  longitude: -119.86,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}  



const MapViewScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map} defaultZoom={15} provider={PROVIDER_GOOGLE} region={INITIAL_LOCATION} />

      <View style={styles.buttonContainer}>
        <Button title="This is a hotspot" onPress={toggleModal} />
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <BottomSheet closeModal={toggleModal} />
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
});

export default MapViewScreen;
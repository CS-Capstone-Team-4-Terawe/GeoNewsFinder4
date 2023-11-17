import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from './components/mapview';

const PROVIDER_GOOGLE = 'google';
const INITIAL_LOCATION = {
  latitude: 34.413,
  longitude: -119.86,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} defaultZoom={15} provider={PROVIDER_GOOGLE} region={INITIAL_LOCATION} />
    </View>
  )
}

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
});
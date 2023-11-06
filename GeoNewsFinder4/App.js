import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { WebView } from 'react-native-webview';
import { PROVIDER_GOOGLE } from 'react-native-maps';

export default function App() {
  return Platform.OS === "web" ? (
    <iframe
    width="1000"
    height="1000"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBzqOAEFXewORNVWDH8UKRueMF9boPygbs
      &q=Space+Needle,Seattle+WA">
  </iframe>
  ) : (
    <View style={styles.container}>
    <MapView style={styles.map} provider={PROVIDER_GOOGLE}/>
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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
;import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXQ6t_wkfvIEa6sjoRa1A4lhinWZ0iMOI",
  authDomain: "geonewsfinder.firebaseapp.com",
  projectId: "geonewsfinder",
  storageBucket: "geonewsfinder.appspot.com",
  messagingSenderId: "133538571695",
  appId: "1:133538571695:web:9e24ada36a64ff86e0bb5a",
  measurementId: "G-04913D7R6J"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
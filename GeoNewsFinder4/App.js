import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapViewScreen from './screens/MapViewScreen';
import ArticleSynopsisView from './screens/ArticleSynopsisViewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'teal' },
        }}
      >
        <Stack.Screen
          name='Home'
          component={ MapViewScreen }
          options={{
            title: ' ',
          }}
        />
        <Stack.Screen
          name='ArticlePage'
          component={ ArticleSynopsisView }
          options={{
            title: '',
            headerShown: true,
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
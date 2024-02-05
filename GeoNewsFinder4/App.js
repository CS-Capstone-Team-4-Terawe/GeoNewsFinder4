import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapViewScreen from './screens/MapViewScreen';
import ArticleSynopsisView from './screens/ArticleSynopsisViewScreen';
import LoginView from './screens/LoginViewScreen';
import ProfileView from './screens/ProfileViewScreen';
import UserInfoView from './screens/UserInfoViewScreen';
import UserPreferencesView from './screens/UserPreferencesViewScreen';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

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
        <Stack.Screen
          name='ProfileView'
          component={ ProfileView }
          options={{
            title: '',
            headerShown: true,
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
        <Stack.Screen
          name='LoginView'
          component={ LoginView }
          options={{
            title: '',
            headerShown: true,
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
        <Stack.Screen
          name='UserInfoView'
          component={ UserInfoView }
          options={{
            title: '',
            headerShown: true,
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
        <Stack.Screen
          name='UserPreferencesView'
          component={ UserPreferencesView }
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
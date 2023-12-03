import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapViewScreen from './screens/MapViewScreen';
import ArticleSynopsisView from './screens/ArticleSynopsisViewScreen';
import SummaryShowing from './components/SummaryShowing';
import ChatBot from './components/ChatBot';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: true,
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'teal' },
        }}
      >
        <Stack.Screen
          name='Home'
          component={ MapViewScreen }
          options={{
            title: 'GeoNewsFinder4',
          }}
        />
        <Stack.Screen
          name='ArticlePage'
          component={ ArticleSynopsisView }
          options={{
            title: 'Article Synopsis',
          }}
        />
        <Stack.Screen
          name='ArticleSummary'
          component={ SummaryShowing }
          options={{
            title: 'SummaryShowing',
          }}
        />
        <Stack.Screen
          name='AskQuestionsHere'
          component={ ChatBot}
          options={{
            title: 'ChatBot',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
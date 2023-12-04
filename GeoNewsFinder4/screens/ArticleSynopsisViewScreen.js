import React from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OverviewRoute from '../components/Overview';
import AskGPTRoute from '../components/AskGPT';
import RelatedArticlesRoute from '../components/RelatedArticles';

function ArticleSynopsisView( {route, navigation} ) {
  const renderScene = SceneMap({
    first: () => <OverviewRoute route = {route} />,
    second: () => <AskGPTRoute />,
    third: () => <RelatedArticlesRoute route={route} />,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Overview' },
    { key: 'second', title: 'Chat Bot' },
    { key: 'third', title: 'Related' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabBarIndicator}
      labelStyle={styles.tabBarLabel}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.tabBarLabel, { color: focused ? '#1C75CF' : 'rgb(184,184,184)' }]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{route.params.name.title}</Text>
        {/* TODO: this is hardcoded rn, need generate data somehow and replace */}
        <Text style={styles.articleInfo}>10+ Articles · 4 Days ago</Text>
        <Text style={styles.articleInfo}>Topics: College, Santa Barbara, Student</Text>
        {/*  */}
        <Image source={{ uri: route.params.name.urlToImage }} style={styles.image} />
      </View>
      <View style={styles.tabViewContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    titleContainer: {
      position: 'absolute',
      top: 0,
      height: '35%',
      width: '90%',
      paddingTop: 12,
    },
    title: {
      fontSize: 17,
      marginBottom: 10,
      height: '8%',
    },
    articleInfo: {
      color: 'rgb(184,184,184)',
      fontSize: 15,
      marginBottom: 5,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabViewContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '65%',
    },
    tabBar: {
      backgroundColor: 'white',
      height: '8%',
      borderBottomWidth: 1,
      borderColor: 'rgb(184,184,184)',
    },
    tabBarIndicator: {
      backgroundColor: '#1C75CF',
      height: 3,
      width: 80,
      marginLeft: 26,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    tabBarLabel: {
      fontSize: 15,
      color: 'black',
      fontFamily: 'Arial',
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 8,
      marginTop: 5,
    }
  });

export default ArticleSynopsisView;


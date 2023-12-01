import React from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OverviewRoute from '../components/Overview';
import AskGPTRoute from '../components/AskGPT';
import RelatedArticlesRoute from '../components/RelatedArticles';

function ArticleSynopsisView( {route, navigation} ) {
  const renderScene = SceneMap({
    first: OverviewRoute,
    second: AskGPTRoute,
    third: RelatedArticlesRoute,
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
    />
  );
  console.log(route.params.name.title);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>{route.params.name.title}</Text>
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
    title: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '35%',
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
      backgroundColor: 'teal',
      height: '9%',
    },
    tabBarIndicator: {
      backgroundColor: 'white',
    },
    tabBarLabel: {
      fontSize: 12,
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 8,
    }
  });

export default ArticleSynopsisView;


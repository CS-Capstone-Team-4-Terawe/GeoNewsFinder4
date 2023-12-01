import React from 'react';
import { View, StyleSheet, useWindowDimensions} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

function ArticleSynopsisView() {
  const OverviewRoute = () => (
    <View style={styles.overviewContainer} />
  );
  
  const ChatBotRoute = () => (
    <View style={styles.chatBotContainer} />
  );

  const RelatedTilesRoute = () => (
    <View style={styles.relatedTilesContainer} />
  );
  
  const renderScene = SceneMap({
    first: OverviewRoute,
    second: ChatBotRoute,
    third: RelatedTilesRoute,
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

  return (
    <View style={styles.container}>
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
    overviewContainer: {
      flex: 1,
      backgroundColor: 'grey',
    },
    chatBotContainer: {
      flex: 1,
      backgroundColor: 'red',
    },
    relatedTilesContainer: {
      flex: 1,
      backgroundColor: 'blue',
    },
  });

export default ArticleSynopsisView;


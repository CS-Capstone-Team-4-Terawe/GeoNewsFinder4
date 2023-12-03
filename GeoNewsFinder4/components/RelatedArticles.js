import { React, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Card } from 'react-native-elements';
import getAPIdata from '../utils/getAPIdata';

const RelatedArticlesRoute = ({ route }) => {

  const [newsData, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data")
      if (route.params.hotspot) {
        console.log(route.params.hotspot);
        await getAPIdata(route.params.hotspot, setData);
      }
    };
    fetchData();
  }, [route.params.hotspot]);

  return (
    <View style={styles.relatedArticlesContainer}>
      <FlatList
        style={styles.container2}
        data={newsData}
        keyExtractor={(item) => item.url}
        numColumns={2}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </Card>
          // TODO: when clicked, open the article in a chrome/safari
        ) }
      />
    </View>
  );
};

const styles = StyleSheet.create({
    relatedArticlesContainer: {
        flex: 1,
    },
    container2: {
      width: '100%',
      flex: 1,
    },
    card: {
      flex: 1,
      margin: 5,
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 8,
    },
});

export default RelatedArticlesRoute;

import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Image, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';

export default function App() {
  const [newsData, setData] = useState([]);
  const getAPIdata = async () => {
    const topic = 'Apple';
    const searchIn = 'description';   // parameters: title, description, content
    const domains = '';               // example: bbc.co.uk,techcrunch.com
    const excludeDomains = '';
    const fromDate = '2023-10-27';    // format: YYYY-MM-DD
    const toDate = '';                // format: YYYY-MM-DD
    const language = '';              // example: ar, de, en, es, fr
    const sortBy = 'popularity';      // parameters: relevancy, popularity, publishedAt
    const newsURL = 'https://newsapi.org/v2/everything?' +
    `q=${topic}&` +
    `searchIn=${searchIn}&` +
    `domains=${domains}&` +
    `excludeDomains=${excludeDomains}&` +
    `from=${fromDate}&` +
    `to=${toDate}&` +
    `language=${language}&` +
    `sortBy=${sortBy}&` +
    'pageSize=10&' +
    'apiKey=e9c4617558cd4256a90396d505f17666';

    let result = await fetch(newsURL);
    result = await result.json();
    setData(result.articles);
  }
  useEffect (() => {
    getAPIdata();
  }, []);
  console.log(newsData);

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </Card>
  );


  return (
    <View style={styles.container2}>
      {/* <MapView style={styles.map} provider={PROVIDER_GOOGLE}/> */}
      <FlatList
        data={newsData}
        keyExtractor={(index) => index.toString()}
        numColumns={2}
        renderItem={renderItem}
      />
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

  container2: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
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
  title: {
    marginTop: 10,
    fontSize: 16,
  },
});

import { React, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const BottomSheet = ({ closeModal }) => {

    const navigation = useNavigation();

    // const navigateToArticleSynopsisScreen = (param) => {
    //     navigation.navigate('ArticlePage', {name: 'Article Synopsis'});
    //     closeModal();
    // }

    const [newsData, setData] = useState([]);

    const getAPIdata = async () => {
      const topic = 'Apple';
      const searchIn = 'description';   // parameters: title, description, content
      const domains = '';               // example: bbc.co.uk,techcrunch.com
      const excludeDomains = '';
      const fromDate = '2023-11-27';    // format: YYYY-MM-DD
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

      console.log(newsURL)

      let result = await fetch(newsURL);
      result = await result.json();
      setData(result.articles);
    }
    useEffect (() => {
      getAPIdata();
    }, []);
    console.log(newsData);

  return (
    <View style={styles.bottomSheetContainer}>
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close Bottom Sheet</Text>
      </TouchableOpacity>

      <Text style={styles.modalText}>Heather and Jai need to put articles in here</Text>
      <FlatList
        style={styles.container2}
        data={newsData}
        keyExtractor={(index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={ () => {
              navigation.navigate('ArticlePage', {name: item.title});
              closeModal();
            }} 
            style={styles.container2}>
            <Card containerStyle={styles.card}>
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        ) }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    width: '100%',
    height: '75%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
  },
  openPageButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  openPageButtonText: {
    color: 'white',
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
  title: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default BottomSheet;

import { React, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import getAPIdata from '../utils/getAPIdata';

const BottomSheet = ({ closeModal, hotspotId }) => {

    const navigation = useNavigation();

    const [newsData, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        console.log("fetching data")
        if (hotspotId) {
          console.log(hotspotId);
          const data = await getAPIdata(hotspotId);
          console.log("data");
          console.log(data);
          setData(data);
        }
      };
      fetchData();
    }, [hotspotId]);  
    console.log(newsData);

  return (
    <View style={styles.bottomSheetContainer}>
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close Bottom Sheet</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.container2}
        data={newsData}
        keyExtractor={(item) => item.url}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={ () => {
              navigation.navigate('ArticlePage', {name: item});
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

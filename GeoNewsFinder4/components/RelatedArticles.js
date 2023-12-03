import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native'; 

const RelatedArticlesRoute = ({ route }) => {

  console.log(route.params.name.title)
  return (
    <View style={styles.bottomSheetContainer}>
      {/* <Text>Related Articles</Text> */}
      <Text>{route.params.parameter}</Text>
    </View>

    // <View style={styles.bottomSheetContainer}>
    //   <FlatList
    //     style={styles.container2}
    //     data={newsData}
    //     keyExtractor={(item) => item.url}
    //     numColumns={2}
    //     renderItem={({ item }) => (
    //       <TouchableOpacity 
    //         onPress={ () => {
    //           navigation.navigate('ArticlePage', {name: item});
    //           closeModal();
    //         }} 
    //         style={styles.container2}>
    //         <Card containerStyle={styles.card}>
    //           <Image source={{ uri: item.urlToImage }} style={styles.image} />
    //           <Text style={styles.title}>{item.title}</Text>
    //         </Card>
    //       </TouchableOpacity>
    //     ) }
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
    relatedArticlesContainer: {
        flex: 1,
        backgroundColor: 'blue',
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

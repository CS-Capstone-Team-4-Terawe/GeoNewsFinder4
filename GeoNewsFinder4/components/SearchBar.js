import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Image} from 'react-native';

const SearchBar = ({ onSearchSubmit }) => {
  const [searchInput, setSearchInput] = useState('');

  const clearSearchInput = () => {
    setSearchInput('');
  };

  const handlSearchInput = (text) => {
    setSearchInput(text)
  };

    return (
      <SafeAreaView>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search location/topic..."
            onSubmitEditing={onSearchSubmit}
            onChangeText={handlSearchInput}
            value={searchInput}
          />
          <TouchableOpacity style={styles.clearButton} onPress={clearSearchInput}>
            <Image source={require('../assets/X.png')} style={styles.xImage} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  
  const styles = StyleSheet.create({
    input: {
      height: 45,
      width: 325,
      margin: 0,
      padding: 10,
      borderRadius: 20,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: 'white',
      shadowColor: 'black', // Shadow color
      shadowOffset: { width: 3, height: 3 }, // Shadow offset
      shadowOpacity: 0.6, // Shadow opacity
      shadowRadius: 2, // Shadow radius
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
    },
    clearButton: {
      margin: 0,
      height: 45,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      shadowColor: 'black', 
      shadowOffset: { width: 3, height: 3 }, 
      shadowOpacity: 0.6, 
      shadowRadius: 2, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    xImage: {
      height: 30,
      width: 30,
    }
  });
  
  export default SearchBar;
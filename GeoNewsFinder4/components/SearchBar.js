import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, View} from 'react-native';

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
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  
  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 300,
      margin: 0,
      padding: 10,
      borderWidth: 1,
      borderRightWidth: 0,
      borderRadius: 15,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: 'white',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    clearButton: {
      margin: 0,
      height: 40,
      padding: 10,
      backgroundColor: 'white',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderRadius: 15,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  });
  
  export default SearchBar;
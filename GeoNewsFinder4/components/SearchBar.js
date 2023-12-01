import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

const SearchBar = ({ onSearchSubmit }) => {
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Search location/topic..."
          onSubmitEditing={onSearchSubmit}
        />
      </SafeAreaView>
    );
  };
  
  
  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 300,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 15,
      backgroundColor: 'white',
    },
  });
  
  export default SearchBar;
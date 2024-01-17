import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const ProfileView = () =>{
 
  
  return (
    <View style={styles.container}>
      <Text>Bye</Text>
      <View style={styles.line}></View>
      <View>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>Mr. Cheddah</Text>
      </View>
      <View style={styles.line}></View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgb(184,184,184)',
    },
    label: {
        color: 'rgb(184,184,184)',
    },
    text: {

    },
  });

export default ProfileView;


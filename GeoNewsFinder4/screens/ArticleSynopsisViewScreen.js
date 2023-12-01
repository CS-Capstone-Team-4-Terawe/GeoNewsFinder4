import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

function ArticleSynopsisView({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.openPageButtonText}>{route.params.name}</Text>
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
  });

export default ArticleSynopsisView;

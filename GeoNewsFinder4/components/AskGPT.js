import React from 'react';
import { View, StyleSheet } from 'react-native';

const AskGPTRoute = () => {

  return (
    <View style={styles.chatBotContainer} />
  );
};

const styles = StyleSheet.create({
    chatBotContainer: {
        flex: 1,
        backgroundColor: 'red',
    },
});

export default AskGPTRoute;

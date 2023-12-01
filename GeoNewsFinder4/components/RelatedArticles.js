import React from 'react';
import { View, StyleSheet } from 'react-native'; 

const RelatedArticlesRoute = () => {

  return (
    <View style={styles.relatedArticlesContainer} />
  );
};

const styles = StyleSheet.create({
    relatedArticlesContainer: {
        flex: 1,
        backgroundColor: 'blue',
    },
});

export default RelatedArticlesRoute;

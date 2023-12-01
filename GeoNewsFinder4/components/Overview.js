import React from 'react';
import { View, StyleSheet } from 'react-native';

const OverviewRoute = () => {

  return (
    <View style={styles.overviewContainer} />
  );
};

const styles = StyleSheet.create({
    overviewContainer: {
        flex: 1,
        backgroundColor: 'grey',
    }
});

export default OverviewRoute;

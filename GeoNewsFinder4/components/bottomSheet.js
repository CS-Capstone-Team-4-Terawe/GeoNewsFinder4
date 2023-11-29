import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomSheet = ({ closeModal }) => {

    const navigation = useNavigation();
    
    const navigateToArticleSynopsisScreen = () => {
        navigation.navigate('ArticlePage');
        closeModal();
    }

  return (
    <View style={styles.bottomSheetContainer}>
      <Text style={styles.modalText}>Heather and Jai need to put articles in here</Text>
      <TouchableOpacity onPress={navigateToArticleSynopsisScreen} style={styles.openPageButton}>
        <Text style={styles.openPageButtonText}>Open 3 tab view page</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close Bottom Sheet</Text>
      </TouchableOpacity>
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
});

export default BottomSheet;

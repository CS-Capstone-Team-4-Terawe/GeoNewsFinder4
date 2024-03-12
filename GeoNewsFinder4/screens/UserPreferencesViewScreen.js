import React,  { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';

const UserPreferencesView = () => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);

    const optionsList = {
        1: [
        { id: 1, label: 'Politics', emoji: '🗳️' },
        { id: 2, label: 'Technology', emoji: '💻' },
        { id: 3, label: 'Sports', emoji: '⚽' },
        { id: 4, label: 'Business', emoji: '💼' },
        { id: 5, label: 'Science', emoji: '🔬' }, 
        { id: 6, label: 'Environment', emoji: '🌍' },
        { id: 7, label: 'Education', emoji: '📚' },
        { id: 8, label: 'World News', emoji: '🌐' },
        { id: 9, label: 'Fashion, Beauty & Style', emoji: '👗' },
        { id: 10, label: 'Health', emoji: '🏥' },
        { id: 11, label: 'Entertainment', emoji: '🎬' }, 
        { id: 12, label: 'Food and Cooking', emoji: '🍔' },
        ],
        2: [
        { id: 13, label: 'Football', emoji: '⚽' },
        { id: 14, label: 'Basketball', emoji: '🏀' },
        { id: 15, label: 'Baseball', emoji: '⚾' },
        { id: 16, label: 'Tennis', emoji: '🎾' },
        { id: 17, label: 'Golf', emoji: '⛳' },
        { id: 18, label: 'Swimming', emoji: '🏊' },
        { id: 19, label: 'Running', emoji: '🏃' },
        { id: 20, label: 'Cycling', emoji: '🚴' },
        { id: 21, label: 'None', emoji: '🚫' }
        // Add more options as needed
        ],
        3: [
        { id: 22, label: 'New York City', emoji: '🗽' },
        { id: 23, label: 'Los Angeles', emoji: '🌴' },
        { id: 24, label: 'Chicago', emoji: '🏙️' },
        { id: 25, label: 'Houston', emoji: '🤠' },
        { id: 26, label: 'Phoenix', emoji: '🌵' },
        { id: 27, label: 'Philadelphia', emoji: '🔔' },
        { id: 28, label: 'San Antonio', emoji: '🤠' },
        { id: 29, label: 'San Diego', emoji: '🌴' },
        { id: 30, label: 'Dallas', emoji: '🤠' },
        { id: 31, label: 'San Francisco', emoji: '🌉' },
        { id: 32, label: 'Austin', emoji: '🎸' },
        { id: 33, label: 'Seattle', emoji: '🌧️' },
        { id: 34, label: 'Miami', emoji: '🌴' },
        { id: 35, label: 'Denver', emoji: '🏔️' },
        { id: 36, label: 'London', emoji: '🇬🇧' },
        { id: 37, label: 'Paris', emoji: '🗼' },
        { id: 38, label: 'Tokyo', emoji: '🗼' },
        { id: 39, label: 'Beijing', emoji: '🏯' },
        { id: 40, label: 'Sydney', emoji: '🐨' },
        // Add more options as needed
        ]
        // Add more steps if necessary
    };

    const requiredSelections = {
        1: 3,
        2: 1,
        3: 1
    };

    const questions = {
        1: 'What type of news are you interested in?',
        2: 'What type of sports are you interested in?',
        3: 'What cities are you interested in?'
    };

    const handleOptionToggle = (optionId) => {
      const option = optionsList[currentStep].find((opt) => opt.id === optionId);
      if (!option) return;
      if (currentStep < 3) {
        if (selectedTopics.includes(option.label)) {
          setSelectedTopics(selectedTopics.filter((label) => label !== option.label));
        } else {
          setSelectedTopics([...selectedTopics, option.label]);
        }
      } else if (currentStep === 3) {
        if (selectedLocations.includes(option.label)) {
          setSelectedLocations(selectedLocations.filter((label) => label !== option.label));
        } else {
          setSelectedLocations([...selectedLocations, option.label]);
        }
      }
    };

    const handleNextPage = async () => {
      let selectedTopicsString = selectedTopics.join(", ");
      let selectedLocationsString = selectedLocations.join(", ");
      if (optionsList[currentStep + 1]) {
        setCurrentStep(currentStep + 1);
      } else {
        try {
            await API.post("testAPI", "/test", {
            body: {
                name: user.email,
                topicPrefs: selectedTopicsString,
                locationPrefs: selectedLocationsString,
            }
          });
          dataFromApi = await fetchArticles(selectedTopicsString, selectedLocationsString)
          navigation.navigate('Home', { apiData: dataFromApi }); 
        } catch (error) {
          console.error('Error posting data:', error);
        }
      }
    };

    const fetchArticles = async (topicPrefs, locationPrefs) => {
      try {
        const queryText = locationPrefs + " " + topicPrefs;
        const apiUrl = `https://2sn9j78km9.execute-api.us-west-1.amazonaws.com/test5/articles?query_text=${encodeURIComponent(queryText)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.hits.hits);
        return data; // Return the fetched data
    } catch (err) {
        console.error('Error:', err);
        throw err; // It's a good practice to rethrow the error
    }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.questionText}>{questions[currentStep]}</Text>
          <View style={styles.optionsContainer}>
            {optionsList[currentStep]?.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: (currentStep < 3 && selectedTopics.includes(option.label)) || (currentStep === 3 && selectedLocations.includes(option.label)) ? 'lightblue' : 'white',
                    borderColor: (currentStep < 3 && selectedTopics.includes(option.label)) || (currentStep === 3 && selectedLocations.includes(option.label)) ? 'white' : 'lightgrey',
                  },
                ]}
                onPress={() => handleOptionToggle(option.id)}
              >
                <Text style={styles.optionLabel}>
                  {option.emoji} {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.arrowButton,
              {
                backgroundColor: (currentStep < 3 && selectedTopics.length >= requiredSelections[currentStep]) || (currentStep === 3 && selectedLocations.length >= requiredSelections[currentStep]) ? 'lightblue' : 'grey',
              },
            ]}
            onPress={handleNextPage}
            disabled={ (currentStep < 3 && selectedTopics.length < requiredSelections[currentStep]) || (currentStep === 3 && selectedLocations.length < requiredSelections[currentStep])}
          >
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    questionText: {
      fontSize: 20,
      marginBottom: 20,
      justifyContent: 'center',
      textAlign: 'center',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 20,
    },
    optionButton: {
      padding: 10,
      borderRadius: 10,
      borderWidth: 2,
      margin: 5,
    },
    optionLabel: {
      color: 'black',
      textAlign: 'center',
    },
    arrowButton: {
      backgroundColor: 'grey',
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
    },
    arrowText: {
      color: 'white',
      fontSize: 20,
    },
  });

export default UserPreferencesView;

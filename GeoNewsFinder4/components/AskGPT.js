import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ask } from '../utils/openAIGPTFunctions.js'; 
import axios from 'axios';


const AskGPTRoute = () => {
  const [GPTQuestion, setQuestion] = useState('');
  const [error, setError] = useState(null);
  // Updated: Use state to store chat history
  const [chatHistory, setChatHistory] = useState([]);

  const askGPT = async () => {
    setError(null);
    let question = GPTQuestion.trim();

    if (question) {
      // Add question to chat history
      setChatHistory(currentHistory => [...currentHistory, { type: 'question', content: question }]);

      try {
        console.log("API Gateway try");
        const apiUrl = 'https://etrpbogfh3.execute-api.us-west-1.amazonaws.com/testDB';
        const response = await axios.post(apiUrl, {
          "article_url": "https://www.investorsobserver.com/news/qm-pr/6083944843812377",         
          "isQuestion": true,
          "question": question
        });
        console.log("API Gateway try after 2");

        if (response.data) {
          const responseBody = JSON.parse(response.data.body);
          // Add answer to chat history
          setChatHistory(currentHistory => [...currentHistory, { type: 'answer', content: responseBody.responseContent }]);
          console.log(responseBody.responseContent);
        } else {
          setError("Received unexpected response from the server");
        }
      } catch (e) {
        setError(e?.message || "Something went wrong");
      }
    }
  };

  const handleQuestionInput = (text) => {
    setQuestion(text);
  };

  const askQuestion = async () => {
    console.log("Enter ask question");
    await askGPT();
    setQuestion(''); // Consider keeping the question in the input until a new one is typed
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, chatHistory.length > 0 ? {} : styles.flexGrow]}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.chatTextView}>
          {chatHistory.map((msg, index) => (
            <Text key={index} style={msg.type === 'question' ? styles.questionText : styles.chatText}>
              {msg.content}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message ChatGPT..."
          onSubmitEditing={askQuestion}
          onChangeText={handleQuestionInput}
          value={GPTQuestion}
        />
        <TouchableOpacity style={styles.submitButton} onPress={askQuestion}>
          <Image source={require('../assets/upArrow.png')} style={styles.xImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between', // This ensures the search container stays at the bottom
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 10, // Adjust this value based on the height of your searchContainer
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    width: 300,
    margin: 0,
    paddingLeft: 20,
    fontSize: 17,
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: 'rgb(184,184,184)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', 
    padding: 10,
    backgroundColor: 'white',

  },
  buttonView: {
    margin: 0,
    height: 45,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'rgb(184,184,184)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xImage: {
    height: 30,
    width: 30,
  },
  chatText: {
    fontSize: 16,
    lineHeight: 25,
  },
  chatTextView: {
    flexDirection: 'column', 
    alignItems: 'start',  
    top: 0,
    height: '75%',
    width: '100%',
    padding: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 25,
    color: 'blue', 
  },
  flexGrow: {
    flexGrow: 1,
  },
});

export default AskGPTRoute;
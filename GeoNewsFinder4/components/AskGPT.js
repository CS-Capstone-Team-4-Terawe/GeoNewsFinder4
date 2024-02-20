import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ask } from '../utils/openAIGPTFunctions.js'; 
import axios from 'axios';

const AskGPTRoute = () => {

  const [GPTQuestion, setQuestion] = useState(''); 
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState('Feel free to ask any clarifying questions!');

  const askGPT = async () => {
    setError(null);
    let question = GPTQuestion;

    try {
      // Replace this URL with your actual API Gateway URL
      console.log("API Gateway try");
      const apiUrl = 'https://etrpbogfh3.execute-api.us-west-1.amazonaws.com/testDB';
      const response = await axios.post(apiUrl, {
        "article_url": "https://www.investorsobserver.com/news/qm-pr/6083944843812377",         
        "isQuestion": true,
        "question": question
      });
      console.log("API Gateway try after 2");
      // console.log(response.data)
      if (response.data) {
          // Assuming your API returns the summary in the response's data
          const responseBody = JSON.parse(response.data.body);
          setAnswer(responseBody.responseContent);
          console.log(responseBody.responseContent);
      } else {
          // Handle case where API response does not contain expected data
          setError("Received unexpected response from the server");
      }
  } catch(e) {
      // console.log("big oopsie error log");
      setError(e?.message || "Something went wrong");
  }

};

  const handlQuestionInput = (text) => {
    setQuestion(text)
  };

  const askQuestion = async () => {
    console.log("Enter ask question");
    await askGPT()
    setQuestion('')
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container} 
      automaticallyAdjustKeyboardInsets={true}>
        
      <View style={styles.chatTextView}>
        <Text style={styles.chatText}>{answer}</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message ChatGPT..."
          onSubmitEditing={askQuestion}
          onChangeText={handlQuestionInput}
          value={GPTQuestion}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.submitButton} onPress={askQuestion}>
            <Image source={require('../assets/upArrow.png')} style={styles.xImage} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
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
    marginTop: 15,
    position: 'absolute',
    bottom: 50,
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
    flexDirection: 'row', 
    alignItems: 'start',  
    position: 'absolute',
    top: 0,
    height: '75%',
    width: '100%',
    padding: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default AskGPTRoute;

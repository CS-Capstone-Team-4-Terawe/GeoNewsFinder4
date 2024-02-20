import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ask } from '../utils/openAIGPTFunctions.js'; 

const AskGPTRoute = () => {

  const [GPTQuestion, setQuestion] = useState(''); 
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState('Feel free to ask any clarifying questions!');

  const askGPT = async () => {
    setError(null);
    let question = GPTQuestion;
    try {
        // Example using fetch to call your API Gateway endpoint
        const response = await fetch('https://m5a02eb6rj.execute-api.us-west-1.amazonaws.com/dev/questions', {
            method: 'POST', // Or 'GET', depending on your setup
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question }),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setAnswer(data.answer); // Assuming the Lambda response has an 'answer' field
    } catch (e) {
        setError(e.message || "Something went wrong");
    }
};

  const handlQuestionInput = (text) => {
    setQuestion(text)
  };

  const askQuestion = async () => {
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

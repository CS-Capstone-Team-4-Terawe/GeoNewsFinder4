import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ask } from '../utils/openAIGPTFunctions.js'; 

const AskGPTRoute = () => {

  const [GPTQuestion, setQuestion] = useState(''); 
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState('Feel free to ask any clarifying questions!');

  const askGPT =  async () => {
      setError(null);
      let question = GPTQuestion;
      try{
          let response = await ask(question)
          setAnswer(response)
          }catch(e){
              setError(e?.message || "Something went wrong");
          } finally {
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
    <View style={styles.container}>
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
    </View>

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

import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ask } from '../utils/openAIGPTFunctions.js'; 

const AskGPTRoute = () => {
  const [GPTQuestion, setQuestion] = useState(''); 
  const [conversationHistory, setConversationHistory] = useState([]);
  const [error, setError] = useState(null);

  const askGPT =  async () => {
      setError(null);
      let question = GPTQuestion;
      try {
          let response = await ask(question)
          setConversationHistory(prevHistory => [...prevHistory, { question, answer: response }]);
      } catch (e) {
          setError(e?.message || "Something went wrong");
      } finally {
          setQuestion('');
      }
  };

  const handleQuestionInput = (text) => {
    setQuestion(text)
  };

  const askQuestion = async () => {
    await askGPT()
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.chatTextView}>
          {conversationHistory.map(({ question, answer }, index) => (
            <View key={index} style={styles.messageContainer}>
              <View style={styles.messageHeader}>
                <Image source={require('../assets/mrCheddaPFP.png')} style={styles.profilePic} />
                <Text style={styles.messageFrom}>User</Text>
              </View>
              <View style={styles.questionBubble}>
                <Text style={styles.questionText}>{question}</Text>
              </View>

              <View style={styles.messageHeader}>
                <Image source={require('../assets/chatBotPFP.png')} style={styles.profilePic} />
                <Text style={styles.messageFrom}>ChatBot</Text>
              </View>
              <View style={styles.answerBubble}>
                <Text style={styles.answerText}>{answer}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message ChatGPT..."
          // onSubmitEditing={askQuestion}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  chatTextView: {
    padding: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  searchContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderColor: 'rgb(184,184,184)',
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
  input: {
    flex: 1, 
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(184,184,184)',
  },
  submitButton: {
    marginLeft: 10, 
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
  messageContainer: {
    marginBottom: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profilePic: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  messageFrom: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionBubble: {
    // alignSelf: 'flex-end', // iMessage style(on right)
    alignSelf: 'flex-start', 
    // backgroundColor: '#007bff', // iMessage style
    borderRadius: 20,
    // padding: 10, // iMessage style
    padding: 5,
    marginBottom: 5,
    // maxWidth: '80%', // iMessage style
    maxWidth: '100%',
  },
  questionText: {
    // color: 'white', // iMessage style
    fontSize: 16,
  },
  answerBubble: {
    alignSelf: 'flex-start',
    // backgroundColor: '#f0f0f0', // iMessage style
    borderRadius: 20,
    // padding: 10, // iMessage style
    padding: 5,
    marginBottom: 5,
    // maxWidth: '80%', // iMessage style
    maxWidth: '100%', 
  },
  answerText: {
    fontSize: 16,
  },

});

export default AskGPTRoute;

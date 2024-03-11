import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { ask } from '../utils/openAIGPTFunctions.js'; 
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux'; // Import useSelector


const AskGPTRoute = () => {
  const scrollViewRef = useRef();
  const route = useRoute();
  const articleUrl = route.params?.articleUrl; // Retrieve the articleUrl passed as a parameter
  const [GPTQuestion, setQuestion] = useState('');
  const [error, setError] = useState(null);
  // Updated: Use state to store chat history
  const [chatHistory, setChatHistory] = useState([]);
  const user = useSelector(state => state.user); // Retrieve user information from Redux store

  const askGPT = async () => {
    setError(null);
    let question = GPTQuestion.trim();

    if (question) {
      // Add question to chat history
      setChatHistory(currentHistory => [...currentHistory, { type: 'question', content: question }]);

      try {
        console.log("API Gateway try");
        console.log(user);
        const apiUrl = 'https://etrpbogfh3.execute-api.us-west-1.amazonaws.com/testDB';
        const response = await axios.post(apiUrl, {
          "article_url": articleUrl,         
          "isQuestion": true,
          "question": question,
          "user_info": { 
            "name": user.name,
            "email": user.email,
            "birthdate": user.birthdate,
            "gender": user.gender,
            "location": user.locale
          }
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
    setQuestion(''); // Consider keeping the question in the input until a new one is typed
    await askGPT();
  };

  
  useEffect(() => {
    // Delay scrolling to ensure the newly added message is rendered.
    const timer = setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 30); // Adjust the delay as needed, 100ms is usually enough
  
    return () => clearTimeout(timer); // Clean up the timer when the component unmounts or before re-running the effect
  }, [chatHistory]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []); // This effect depends on no changing dependencies and thus runs once on mount.
  
  const _keyboardDidShow = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  
  const _keyboardDidHide = () => {
    // Optional: Handle any action on keyboard hide if necessary
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.scrollContainer, chatHistory.length > 0 ? {} : styles.flexGrow]}
        // automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.chatTextView}>
          {chatHistory.map((msg, index) => (
            <View key={index} style={styles.messageContainer}>
              <View style={styles.messageHeader}>
                <Image 
                  source={msg.type === 'question' ? require('../assets/mrCheddaPFP.png') : require('../assets/chatBotPFP.png')} 
                  style={styles.profilePic} 
                />
                <Text style={styles.messageFrom}>{msg.type === 'question' ? 'User' : 'ChatBot'}</Text>
              </View>
              <View style={msg.type === 'question' ? styles.questionBubble : styles.answerBubble}>
                <Text style={msg.type === 'question' ? styles.questionText : styles.chatText}>
                  {msg.content}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask GeoNewsFinder..."
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
  searchContainer: {
    marginBottom: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 8,
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
  },
  flexGrow: {
    flexGrow: 1,
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
    width: 40,
    height: 40,
    borderRadius: 20, 
    marginRight: 10,
  },
  messageFrom: {
    fontWeight: 'bold',
  },
  questionBubble: {
    // backgroundColor: '#f0f0f0',
    padding: 3,
    borderRadius: 10,
  },
  answerBubble: {
    // backgroundColor: '#e0e0e0',
    padding: 3,
    borderRadius: 10,
  },
});

export default AskGPTRoute;
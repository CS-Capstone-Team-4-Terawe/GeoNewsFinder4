import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { ask, summarizeArticle, NewsArticle } from '../utils/openAIGPTFunctions.js'; 


const ChatBot = () => {
    const [isLoading1, setIsLoading1] = useState(null); 
    const [error1, setError1] = useState(null);
    const [answer1, setAnswer1] = useState('Loading...');
    const askQuestion1 =  async () => {
        setIsLoading1(true);
        setError1(null);
        let question = "Do you know of any other similar strikes that have happened in the past, and if so how did they end?";
        try{
            let response = await ask(question)
            setAnswer1(response)
            console.log("Answer 1")
            console.log(response);
            }catch(e){
                setError1(e?.message || "Something went wrong");
            } finally {
                setIsLoading1(false);
            }
    };


    const [isLoading2, setIsLoading2] = useState(null); 
	const [error2, setError2] = useState(null);
    const [answer2, setAnswer2] = useState('Loading...');
    const askQuestion2 =  async () => {
        setIsLoading2(true);
        setError2(null);
        let question = "Do these types of things only occur in the united states?";
        try{
        let response = await ask(question)
        setAnswer2(response)
        console.log("Answer 2")
        console.log(response);
        }catch(e){
        setError1(e?.message || "Something went wrong");
        } finally {
        setIsLoading1(false);
        }
    };
    return (
      <View style={styles.container}>
        <Text style={styles.modalText}>{answer1}</Text>
        {error1 && <Text className="text-red-400 text-sm">{error1}</Text>}
        <Button
          buttonColor="bg-blue-600"
          textColor="text-white"
          onPress={async () => {
            await askQuestion1(); 
          }}
          disabled={isLoading1}
          isLoading={isLoading1}
          title="Do you know of any other similar strikes that have happened in the past, and if so how did they end?"
        />
        <Text style={styles.modalText}>{answer2}</Text>
        {error2 && <Text className="text-red-400 text-sm">{error2}</Text>}
        <Button
          buttonColor="bg-blue-600"
          textColor="text-white"
          onPress={async () => {
            await askQuestion2(); 
          }}
          disabled={isLoading2}
          isLoading={isLoading2}
          title="Do these types of things only occur in the united states?"
        />
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
  });

export default ChatBot;
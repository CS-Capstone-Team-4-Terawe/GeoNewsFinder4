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
        "title": "A potential Las Vegas workers strike could throw a wrench in the upcoming F1 race",
        "date": "Monday, November 6, 2023 • 5:00 AM EST",
        "content": "Tens of thousands of Las Vegas hospitality workers may walk off the job this Friday if their union is unable to reach a contract deal with the casinos, hotels, and restaurants that employ them. What could possibly be the largest hospitality worker strike in U.S. history comes as the city is being transformed into a giant racetrack ahead of the Formula 1 Las Vegas Grand Prix scheduled to take place later this month — the first time the sport is returning to the entertainment capital in more than four decades. The Culinary and Bartenders Union said 35,000 of its members at 18 properties would go on strike the morning of Nov. 10 if no deal was reached with MGM Resorts, Caesars Entertainment, and Wynn Resorts. The labor group said it had been negotiating with the hospitality giants in good faith for seven months — and working under an expired contract since Sept. 15 — but believed its workers deserved more than what the companies were offering. Their current proposal on the table is historic, but it's not enough, and workers deserve to have record contracts - especially after these giant corporations are enjoying their record profits, Culinary Union secretary-treasurer Ted Pappageorge said in a statement. Related Story: Formula 1's new fandom; plus, Christian Horner is always on the offense Michael Weaver, chief communications and marketing officer for Wynn Resorts, said the company 'will save our comments regarding negotiations for the bargaining table.' MGM Resorts and Caesars Entertainment did not immediately reply to NPR's request for comment. Complicating the possibility of a massive strike on the Las Vegas Strip is the Formula 1 grand prix weekend scheduled to begin on Nov. 16 and expected to pack the city with tourists. Formula 1 announced last year that it would be adding the Las Vegas race — in addition to contests already held in Miami and Austin — as the sport sees surging popularity across the U.S. Two Formula 1 races were hosted in Las Vegas in 1981 and 1982, but this year's track will be the first one to incorporate the vistas of the city's iconic Strip, with the circuit passing landmarks such as Caesars Palace, the Bellagio, and the Venetian. The Culinary Union is asking race attendees not to cross any picket or strike lines and to refrain from patronizing hotels and casinos where there is a labor dispute. Formula 1 did not immediately reply to NPR's request for comment. Race organizers have also been dealing with some local backlash over how Formula 1 has been preparing for the grand prix — what a Las Vegas Review-Journal columnist called the city's 'love-hate relationship' with the race. While many cheered the boost to the local economy, others have complained about some of the work being done. Formula 1 said it added visual barriers to pedestrian walkways for safety reasons, though some annoyed residents tore them down. Others have complained about trees being chopped down at the Bellagio and construction-related traffic jams.",
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

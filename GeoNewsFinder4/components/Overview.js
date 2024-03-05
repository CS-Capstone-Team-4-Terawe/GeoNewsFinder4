import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, ScrollView } from 'react-native';
import { ask, summarizeArticle, NewsArticle } from '../utils/openAIGPTFunctions.js'; 
import axios from 'axios';

let news_article = new NewsArticle(
  "A potential Las Vegas workers strike could throw a wrench in the upcoming F1 race",
  ["Hernandez", "Joe"],
  "Monday, November 6, 2023 • 5:00 AM EST",
  "Tens of thousands of Las Vegas hospitality workers may walk off the job this Friday if their union is unable to reach a contract deal with the casinos, hotels and restaurants that employ them. What could possibly be the largest hospitality worker strike in U.S. history comes as the city is being transformed into a giant racetrack ahead of the Formula 1 Las Vegas Grand Prix scheduled to take place later this month — the first time the sport is returning to the entertainment capital in more than four decades. The Culinary and Bartenders Union said 35,000 of its members at 18 properties would go on strike the morning of Nov. 10 if no deal was reached with MGM Resorts, Caesars Entertainment and Wynn Resorts. The labor group said it had been negotiating with the hospitality giants in good faith for seven months — and working under an expired contract since Sept. 15 — but believed its workers deserved more than what the companies were offering. Their current proposal on the table is historic, but it's not enough and workers deserve to have record contracts - especially after these giant corporations are enjoying their record profits, Culinary Union secretary-treasurer Ted Pappageorge said in a statement. Related Story: Formula 1's new fandom; plus, Christian Horner is always on the offense Michael Weaver, chief communications and marketing officer for Wynn Resorts, said the company 'will save our comments regarding negotiations for the bargaining table.' MGM Resorts and Caesars Entertainment did not immediately reply to NPR's request for comment. Complicating the possibility of a massive strike on the Las Vegas Strip is the Formula 1 grand prix weekend scheduled to begin on Nov. 16 and expected to pack the city with tourists. Formula 1 announced last year that it would be adding the Las Vegas race — in addition to contests already held in Miami and Austin — as the sport sees surging popularity across the U.S. Two Formula 1 races were hosted in Las Vegas in 1981 and 1982, but this year's track will be the first one to incorporate the vistas of the city's iconic Strip, with the circuit passing landmarks such as Caesars Palace, the Bellagio and the Venetian. The Culinary Union is asking race attendees not to cross any picket or strike lines and to refrain from patronizing hotels and casinos where there is a labor dispute. Formula 1 did not immediately reply to NPR's request for comment. Race organizers have also been dealing with some local backlash over how Formula 1 has been preparing for the grand prix — what a Las Vegas Review-Journal columnist called the city's 'love-hate relationship' with the race. While many cheered the boost to the local economy, others have complained about some of the work being done. Formula 1 said it added visual barriers to pedestrian walkways for safety reasons, though some annoyed residents tore them down. Others have complained about trees being chopped down at the Bellagio and construction-related traffic jams"
  // "Tens of thousands of Las Vegas hospitality workers ...  the Bellagio and construction-related traffic jams"
);

const OverviewRoute = () => {
	const [error, setError] = useState(null);
  const [summary, setSummary] = useState('Loading...');
    useEffect(() => {
      const fetchSummary = async () => {
          setError(null);
          try {
              // Replace this URL with your actual API Gateway URL
              console.log("API Gateway try");
              const apiUrl = 'https://5vfzo8wbu2.execute-api.us-west-1.amazonaws.com/testDBGPT1';
              const response = await axios.post(apiUrl, {
                "article_url": "https://www.cnn.com/politics/live-news/trump-legal-cases-court-02-28-24/index.html",
                "isQuestion": false,
                "question": "There is no question"
                }
              );
              console.log("API Gateway try after 2");
              // console.log(response.data)
              if (response.data) {
                // Assuming your API returns the summary inside the nested body as a JSON string
                // First, parse the outer JSON if not already an object
                const outerBody = typeof response.data.body === 'string' ? JSON.parse(response.data.body) : response.data.body;
                // Then, parse the inner JSON to get the actual content object
                const responseBody = typeof outerBody.body === 'string' ? JSON.parse(outerBody.body) : outerBody.body;
                
                // console.log(responseBody); // This should now log the parsed object
            
                // Now you can access responseContent directly
                const responseContent = responseBody.responseContent;
                console.log(responseContent); // This should log the actual content string
            
                setSummary(responseContent);
              } else {
                  // Handle case where API response does not contain expected data
                  setError("Received unexpected response from the server");
              }
          } catch(e) {
              // console.log("big oopsie error log");
              setError(e?.message || "Something went wrong");
          }
      };
  
      fetchSummary();
  }, []);
  
  return (
    <View style={styles.overviewContainer}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.summaryText}>{summary}</Text>
      </ScrollView>
      {error && <Text className="text-red-400 text-sm">{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    overviewContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      padding: 25,
      paddingTop: 15,
      paddingBottom: 20
    },
    summaryText: {
      fontSize: 16,
      lineHeight: 25
    }
});

export default OverviewRoute;
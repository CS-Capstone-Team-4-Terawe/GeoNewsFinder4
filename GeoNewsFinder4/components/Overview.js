import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { ask, summarizeArticle, NewsArticle } from '../utils/openAIGPTFunctions.js'; 
import axios from 'axios';

let news_article = new NewsArticle(
  "A potential Las Vegas workers strike could throw a wrench in the upcoming F1 race",
  ["Hernandez", "Joe"],
  "Monday, November 6, 2023 • 5:00 AM EST",
  "Tens of thousands of Las Vegas hospitality workers may walk off the job this Friday if their union is unable to reach a contract deal with the casinos, hotels and restaurants that employ them. What could possibly be the largest hospitality worker strike in U.S. history comes as the city is being transformed into a giant racetrack ahead of the Formula 1 Las Vegas Grand Prix scheduled to take place later this month — the first time the sport is returning to the entertainment capital in more than four decades. The Culinary and Bartenders Union said 35,000 of its members at 18 properties would go on strike the morning of Nov. 10 if no deal was reached with MGM Resorts, Caesars Entertainment and Wynn Resorts. The labor group said it had been negotiating with the hospitality giants in good faith for seven months — and working under an expired contract since Sept. 15 — but believed its workers deserved more than what the companies were offering. Their current proposal on the table is historic, but it's not enough and workers deserve to have record contracts - especially after these giant corporations are enjoying their record profits, Culinary Union secretary-treasurer Ted Pappageorge said in a statement. Related Story: Formula 1's new fandom; plus, Christian Horner is always on the offense Michael Weaver, chief communications and marketing officer for Wynn Resorts, said the company 'will save our comments regarding negotiations for the bargaining table.' MGM Resorts and Caesars Entertainment did not immediately reply to NPR's request for comment. Complicating the possibility of a massive strike on the Las Vegas Strip is the Formula 1 grand prix weekend scheduled to begin on Nov. 16 and expected to pack the city with tourists. Formula 1 announced last year that it would be adding the Las Vegas race — in addition to contests already held in Miami and Austin — as the sport sees surging popularity across the U.S. Two Formula 1 races were hosted in Las Vegas in 1981 and 1982, but this year's track will be the first one to incorporate the vistas of the city's iconic Strip, with the circuit passing landmarks such as Caesars Palace, the Bellagio and the Venetian. The Culinary Union is asking race attendees not to cross any picket or strike lines and to refrain from patronizing hotels and casinos where there is a labor dispute. Formula 1 did not immediately reply to NPR's request for comment. Race organizers have also been dealing with some local backlash over how Formula 1 has been preparing for the grand prix — what a Las Vegas Review-Journal columnist called the city's 'love-hate relationship' with the race. While many cheered the boost to the local economy, others have complained about some of the work being done. Formula 1 said it added visual barriers to pedestrian walkways for safety reasons, though some annoyed residents tore them down. Others have complained about trees being chopped down at the Bellagio and construction-related traffic jams"
  // "Tens of thousands of Las Vegas hospitality workers ...  the Bellagio and construction-related traffic jams"
);
let user_name = "Ethan"

let conversation = [
  { role: "system", content: "You are a helpful assistant who specializes in news summaries and always starts a conversation by refering to a user by their name, " + user_name + ". You also are able to answer any questions I have about related topics to the article. You also absolutely refuse to answer any questions unrelated to the topics mentioned in the article."}
];

const OverviewRoute = () => {
  const [isLoading, setIsLoading] = useState(null); 
	const [error, setError] = useState(null);
  	const [summary, setSummary] = useState('Loading...');
  	const summarize =  async () => {
    setIsLoading(true);
		setError(null);
    try{
      let articleSummary = await summarizeArticle(news_article);
		setSummary(articleSummary);
      	console.log("Summarize 1")
      	console.log(articleSummary);
      	// conversation.push({ role: "assistant", content: articleSummary });
		}catch(e){
			setError(e?.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
    };

    useEffect(() => {
      const fetchSummary = async () => {
        await summarize();
      }
      fetchSummary();
    }, []);
  
  return (
    <View style={styles.overviewContainer}>
      <Text style={styles.summaryText}>{summary}</Text>
      {error && <Text className="text-red-400 text-sm">{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    overviewContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    summaryText: {
      fontSize: 18

    }
});

export default OverviewRoute;

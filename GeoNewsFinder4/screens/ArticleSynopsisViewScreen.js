import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ask, summarize, NewsArticle } from '../utils/openAIGPTFunctionsNOKEY'; 

let article = new NewsArticle(
  "A potential Las Vegas workers strike could throw a wrench in the upcoming F1 race",
  ["Hernandez", "Joe"],
  "Monday, November 6, 2023 • 5:00 AM EST",
  "Tens of thousands of L... construction-related traffic jams"
);

async function tempo() {
  console.log("Poggers -1.0");
  let responses = await summarize(article);
  console.log("Poggers 2.0");
  return responses.message.content;
}

// let summary = tempo();

function ArticleSynopsisView() {
  const [summary, setSummary] = useState('Loading...');

  useEffect(() => {
    tempo().then(setSummary);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.modalText}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ArticleSynopsisView;
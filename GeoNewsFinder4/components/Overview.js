import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const OverviewRoute = () => {
  const route = useRoute();
  const articleUrl = route.params?.articleUrl; 
	const [error, setError] = useState(null);
  const [summary, setSummary] = useState('Loading...');
    useEffect(() => {
      const fetchSummary = async () => {
          setError(null);
          try {
              setSummary('Loading...');
              const apiUrl = 'https://5vfzo8wbu2.execute-api.us-west-1.amazonaws.com/testDBGPT1';
              const response = await axios.post(apiUrl, {
                "article_url": articleUrl,
                "isQuestion": false,
                "question": "There is no question"
                }
              );
              if (response.data) {
                const outerBody = typeof response.data.body === 'string' ? JSON.parse(response.data.body) : response.data.body;
                const responseBody = typeof outerBody.body === 'string' ? JSON.parse(outerBody.body) : outerBody.body;
                const responseContent = responseBody.responseContent;
                setSummary(responseContent);
              } else {
                  setError("Received unexpected response from the server");
              }
          } catch(e) {
              setError(e?.message || "Something went wrong");
          }
      };
  
      fetchSummary();
  }, [articleUrl]);

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
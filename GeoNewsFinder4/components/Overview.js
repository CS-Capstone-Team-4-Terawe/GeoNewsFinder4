import React from 'react';
import { View, StyleSheet } from 'react-native';
import { extract } from '@extractus/article-extractor';
import fetch from 'cross-fetch';

const OverviewRoute = ({route}) => {
  const newsURL = route.params.name.url;
  const [newsContent, setData] = useState([]);
  useEffect(() => {
    const fetchContent = async () => {
      if (route.params.name.content) {
        let result = await extract(newsURL);
        setData(result.content);
        console.log(newsContent);
      }
    };
    fetchContent();
  }, [route.params.name.url]);

  return (
    <View style={styles.overviewContainer} />

  );
};

const styles = StyleSheet.create({
    overviewContainer: {
        flex: 1,
        backgroundColor: 'grey',
    }
});

export default OverviewRoute;

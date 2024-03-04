import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';

const ProfileView = () =>{
const navigation = useNavigation();
const user = useSelector(state => state.user);
const [userInfo, setUserInfo] = React.useState({});

const handleConfimation = () => {
    handleButtonTap();
    navigation.navigate('Home');
}

React.useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await API.get('testAPI', '/test');
        const name = user.email; 
        const itemsWithName = responseData.filter(item => item.name === name);
        setUserInfo(itemsWithName[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

const handleButtonTap = () => {
    try {
        // console.log(userInfo);
        console.log("making request", userInfo.locationPrefs, userInfo.topicPrefs);
        queryText = userInfo.locationPrefs + " " + userInfo.topicPrefs
        const apiUrl = `https://2sn9j78km9.execute-api.us-west-1.amazonaws.com/test5/articles?query_text=${encodeURIComponent(queryText)}`;
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data.hits.hits);
        })
      .catch(error => {
        console.error('Error:', error);
      }); 
    } catch (err) {
        console.error(err);
    }
}

  return (
    <View style={styles.container}>
        <View style={styles.headingSection}>
            <Image source={require('../assets/favicon.png')} style={styles.profilePic}/>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <TouchableOpacity style={styles.button} 
            onPress={ handleConfimation }
            >
                <Text style={styles.buttonText}>Back to Map View</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.line}></View>
      <View style={styles.infoSection}>
        <Text style={styles.title}>Basic Info</Text>
        <View style={styles.infoItem}>
            <View style={styles.idk}>
                <Text style={styles.label}>NAME</Text>
                <Text style={styles.text}>{user.name}</Text>
            </View>
            <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
        </View>
        <View style={styles.infoItem}>
            <View>
                <Text style={styles.label}>BIRTHDAY</Text>
                <Text style={styles.text}>{user.birthdate}</Text>
            </View>
            <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
        </View>
        <View style={styles.infoItem}>
            <View>
                <Text style={styles.label}>GENDER</Text>
                <Text style={styles.text}>{user.gender}</Text>
            </View>
            <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
        </View>
        <View style={styles.infoItem}>
            <View>
                <Text style={styles.label}>EMAIL</Text>
                <Text style={styles.text}>{user.email}</Text>
            </View>
            <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
        </View>
        <View style={styles.infoItem}>
            <View>
                <Text style={styles.label}>LOCATION</Text>
                <Text style={styles.text}>{user.locale}</Text>
            </View>
            <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
        </View>
      </View>
      <View style={styles.line}></View>
      {userInfo && (
        <View style={styles.infoSection}>
            <Text style={styles.title}>Interests</Text>
            <View style={styles.infoItem}>
                <View>
                    <Text style={styles.label}>Topic Preferences</Text>
                    <Text style={styles.text}>{userInfo.topicPrefs}</Text>
                </View>
                <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
            </View>
            <View style={styles.infoItem}>
                <View>
                    <Text style={styles.label}>Location Preferences</Text>
                    <Text style={styles.text}>{userInfo.locationPrefs}</Text>
                </View>
                <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
            </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 15,
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgb(184,184,184)',
    },
    label: {
        color: 'rgb(184,184,184)',
        fontSize: 14,
        marginBottom: 2,
    },
    text: {
        fontSize: 14,
    },
    infoItem: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoSection: {
        width: '100%',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
    },
    headingSection: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    profilePic: {
        height: 100,
        width: 100,
        borderWidth: 1,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
    },
    email: {
        color: 'rgb(184,184,184)',
    },
    button: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'rgb(184,184,184)',
    },
    buttonText: {
        fontSize: 12,
    },
    arrow: {
        height: 25,
        width: 25,
    },
  });

export default ProfileView;


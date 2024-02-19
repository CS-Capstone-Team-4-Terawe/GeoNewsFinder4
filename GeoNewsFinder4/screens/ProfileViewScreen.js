import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';


const handleButtonTap = async () => {
    try {
      const responseData = await API.get('userPrefsAPI', '/userPrefs');
      console.log(responseData);
    } catch (err) {
      console.error(err.response.data);
    }
  }

const ProfileView = () =>{
const navigation = useNavigation();
const user = useSelector(state => state.user);

const handleConfimation = () => {
    handleButtonTap();
    navigation.navigate('Home');
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
                <Text style={styles.buttonText}>Manage your Google Account</Text>
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
        <View style={styles.infoSection}>
            <Text style={styles.title}>Interests</Text>
            <View style={styles.infoItem}>
                <View>
                    <Text style={styles.label}>SPORTS</Text>
                    <Text style={styles.text}>tennis, cheeseeating, golf, yapping</Text>
                </View>
                <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
            </View>
            <View style={styles.infoItem}>
                <View>
                    <Text style={styles.label}>TECHNOLOGY</Text>
                    <Text style={styles.text}>AI, ALGORITHMS</Text>
                </View>
                <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
            </View>
            <View style={styles.infoItem}>
                <View>
                    <Text style={styles.label}>OCCUPATION</Text>
                    <Text style={styles.text}>cheese eater</Text>
                </View>
                <Image source={require('../assets/rightArrow.png')} style={styles.arrow}/>
            </View>
        </View>
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


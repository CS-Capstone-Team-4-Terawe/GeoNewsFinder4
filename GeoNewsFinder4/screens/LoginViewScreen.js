import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { logIn, setUser } from '../redux/action';
import { API } from 'aws-amplify';

function LoginView() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userInfo, setUserInfo] = React.useState({});
  const dispatch = useDispatch();
  
  const handleSignIn = () => {
    signIn();
  }

  const handleSignUp = () => {
    navigation.navigate('SignUpView');
  }

  async function signIn() {
    try {
      const user = await Auth.signIn(email, password);
      console.log('Signed in as: ', user.attributes.name);
      dispatch(logIn());
      dispatch(setUser(user.attributes));
      await fetchData(user);
      const dataFromApi = await fetchArticles();
      navigation.navigate('Home', { apiData: dataFromApi }); // Pass data as a parameter
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const fetchArticles = async () => {
    try {
      const queryText = userInfo.locationPrefs + " " + userInfo.topicPrefs;
      const apiUrl = `https://2sn9j78km9.execute-api.us-west-1.amazonaws.com/test5/articles?query_text=${encodeURIComponent(queryText)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.hits.hits);
      return data; // Return the fetched data
  } catch (err) {
      console.error('Error:', err);
      throw err; // It's a good practice to rethrow the error
  }
  }

  const fetchData = async (user) => {
    try {
      const responseData = await API.get('testAPI', '/test');
      const name = user.email; 
      const itemsWithName = responseData.filter(item => item.name === name);
      setUserInfo(itemsWithName[0]);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>GeoNewsFinder4</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          style={styles.input}
          value = { email }
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          secureTextEntry
          value = { password }
          onChangeText={ text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={ handleSignIn }
          >
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={ handleSignUp }
          >
            <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '80%',

    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#1C75CF',
  },
  registerButton: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#1C75CF',
  },
  loginButtonText: {
      fontSize: 16,
      color: 'white',
  },
  registerButtonText: {
    fontSize: 16,
    color: '#1C75CF',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    position: 'absolute',
    top: 150,
  }
  });

export default LoginView;

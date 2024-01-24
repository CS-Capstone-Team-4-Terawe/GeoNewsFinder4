import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


function LoginView() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Signed in with: ", user?.email);
      navigation.navigate('UserInfoView');
    })
    .catch(error => {
      alert(error.message);
    })
  }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log("Registered with: ", user?.email);
      navigation.navigate('UserInfoView');
    })
    .catch(error => {
      alert(error.message);
    })
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
    // height: '100%',
    // width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // paddingBottom: 150,
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

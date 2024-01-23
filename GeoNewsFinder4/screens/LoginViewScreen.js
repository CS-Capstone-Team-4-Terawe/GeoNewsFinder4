import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from '../firebase';

function LoginView() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = async (email, password) => {
    try {
      console.log("register pressed")
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.code);
      // alert(error.message);
    }
    console.log("creating bye")
  }

  const handleSignIn = async (email, password) => {
    try {
      console.log("Sign in pressed")
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // alert(error.code);
      alert(error.message);
    }
    console.log("signed in bye")
  }
  
  return (
    <KeyboardAvoidingView style={styles.container}>
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
          onPress={() => {
            navigation.navigate('ProfileView');
          }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={ handleSignIn }
          >
            <Text style={styles.registerButtonText}>Login With Google</Text>
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
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
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
  }
  });

export default LoginView;

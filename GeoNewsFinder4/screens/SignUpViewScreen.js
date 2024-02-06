import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';


function SignUpView() {
  const navigation = useNavigation();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');

  const handleSignUp = () => {
    signUp();
  }
  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          gender,   // Provide gender attribute
          birthdate, // Provide birthdate attribute
          locale: 'en_US',
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true
        }
      });
      console.log(user);
      navigation.navigate('ConfirmView', { email });
    } catch (error) {
      console.log('error signing up:', error);
    }
  }
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder='John Cena'
          style={styles.input}
          value = { name }
          onChangeText={ text => setName(text)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder='johncena@ucsb.edu'
          style={styles.input}
          value = { email }
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder='8 characters minimum'
          style={styles.input}
          secureTextEntry
          value = { password }
          onChangeText={ text => setPassword(text)}
        />
        <Text style={styles.label}>Birthdate</Text>
        <TextInput
          placeholder='1990-01-05'
          style={styles.input}
          value = { birthdate }
          onChangeText={ text => setBirthdate(text)}
        />
        <Text style={styles.label}>Gender</Text>
        <TextInput
          placeholder='male'
          style={styles.input}
          value = { gender }
          onChangeText={ text => setGender(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={ handleSignUp }
          >
            <Text style={styles.signUpButtonText}>Register</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderWidth: 1,
    borderBottomWidth: 2,
    // borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#1C75CF',
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#1C75CF',
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  });

export default SignUpView;

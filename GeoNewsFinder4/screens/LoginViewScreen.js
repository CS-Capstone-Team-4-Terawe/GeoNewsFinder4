import React from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Image } from 'react-native';

function LoginView( {route, navigation} ) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  return (
    <View style={styles.container}>
      <Text>Hi</Text>
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
    },
  });

export default LoginView;


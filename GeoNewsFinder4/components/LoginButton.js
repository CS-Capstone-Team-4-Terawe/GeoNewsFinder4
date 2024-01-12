import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const LoginButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Image source={require('../assets/gear.png')} style={styles.gearImage}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: 60,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'black', 
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5, 
        shadowRadius: 1,
    },
    gearImage: {
        height: 50,
        width: 50,
    }
})

export default LoginButton;
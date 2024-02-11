import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const UserInfoView = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('UserPreferencesView');}}>
                <Text style={styles.buttonText}>Go to preferences</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: 'rgb(184,184,184)',
    },
    buttonText: {
        fontSize: 12,
    },
});

export default UserInfoView;

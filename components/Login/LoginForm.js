import React from 'react';
import { StyleSheet, TextInput, View,
     TouchableOpacity, Text, StatusBar } from 'react-native';


export default class Login extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' ></StatusBar>
        <TextInput 
        style={styles.input} 
        placeholder='username or email' 
        returnKeyType='next'
        onSubmitEditing={() => this.passwordInput.focus()}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
         />

        <TextInput 
        style={styles.input} 
        secureTextEntry
        placeholder='password'
        ref={(input) => this.passwordInput = input} />

        <TouchableOpacity style={styles.buttonContainer} >
            <Text style={styles.buttonText} 
            returnKeyType='go'>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      padding: 20
  },
  input: {
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 20,
      color: '#fff',
      paddingHorizontal: 10
  }
  ,buttonContainer:{
      backgroundColor: '#000',
      paddingVertical: 15,
      borderRadius: 50
  },
  buttonText:{
      textAlign: 'center',
      color: '#fff',
      fontWeight: '700'
  }
  
  
});

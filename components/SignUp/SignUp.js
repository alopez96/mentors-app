import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View,
  TouchableOpacity, Image } from 'react-native';
import SignUpForm from './SignUpForm'

export default class SignUp extends React.Component {
  render() {    
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.logoContainer} >
            <Image style={styles.logo}
            source= {require('../../images/logo.png')}/>
            <Text style={styles.title} > Unite </Text>
      </View>
      <View styles={styles.formContainer} >
        <SignUpForm></SignUpForm>
      <TouchableOpacity>
        <Text style={styles.signUpText}>Login</Text>
      </TouchableOpacity>
      </View>
      
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 150
  }
  ,title:{
      color: '#fff',
      marginTop: 10,
      opacity: 0.9
  },
  formContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  },
  signUpText:{
    color:'#000',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30
  }
  
});

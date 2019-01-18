import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, Image } from 'react-native';
import LoginForm from './LoginForm'


export default class Login extends React.Component {


  render() {
    
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.logoContainer} >
            <Image style={styles.logo}
            source= {require('../../images/logo.png')}/>
            <Text style={styles.title} >LinkedMe</Text>
      </View>
      <View styles={styles.formContainer} >
        <LoginForm></LoginForm>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  }
  ,title:{
      color: '#fff',
      marginTop: 10,
      opacity: 0.9
  },
  formContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  }
  
});

import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';


export default class App extends React.Component {
  render() {    
    return (
      <SafeAreaView style={styles.container}>
      
      <SignUp></SignUp>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

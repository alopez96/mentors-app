import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';


export default class App extends React.Component {
  render() {    
    return (
      <SafeAreaView style={styles.container}> 
      <Profile></Profile>
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

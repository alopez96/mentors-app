import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Profile from './components/Profile/Profile';

const intialState = {
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}

export default class App extends React.Component {

  constructor(){
    super()
    this.state = intialState;
  }

  loadUser = (data) => {
    console.log('user is signed in', data)
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined
      }
    })
  }


  render() {    
    return (
      <SafeAreaView style={styles.container}> 
      <Login
        loadUser={this.loadUser}>
      </Login>
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

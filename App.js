import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './components/Login/Login';


export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
      <Login></Login>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

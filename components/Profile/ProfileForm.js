import React from 'react';
import { StyleSheet, TextInput, View,
     TouchableOpacity, Text, StatusBar } from 'react-native';


export default class ProfileForm extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' ></StatusBar>
        <TextInput 
            style={styles.input} 
            placeholder='Name' 
            returnKeyType='next'
            onChangeText={this.props.onnameInputChange}
            autoCapitalize='none'
            autoCorrect={false}
            />
            <TextInput 
            style={styles.input} 
            placeholder='Home Town' 
            returnKeyType='next'
            onChangeText={this.props.onhomeTownInputChange}
            autoCapitalize='none'
            autoCorrect={false}
            />

          <TextInput 
            style={styles.input} 
            placeholder='School' 
            returnKeyType='next'
            onChangeText={this.props.onSchoolInputChange}
            autoCapitalize='none'
            autoCorrect={false}
            />

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
    backgroundColor: '#0193ED',
    borderRadius: 50,
    margin: 30,
    marginBottom: 5,
    color: '#fff',
    paddingHorizontal: 10
},


});

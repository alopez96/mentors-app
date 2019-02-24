import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CardComponent from '../Card/CardComponent';
import {Container, Content, Header,Form, Item,
    Textarea, Input, Icon , Button} from 'native-base';
import {connect} from 'react-redux';
import {localhost} from '../../localhost';

class CreateEvent extends Component {


  constructor(props){
    super(props);
    this.state = {  
        eventid: '',
        title: '',
        imageurl: '',
        description: '',
    };
  }

  cancelCreateEvent = () => {
    this.props.navigation.navigate('Home')
  }

  createEventAction = () => {
    console.log('create event action')
    fetch('http://'+localhost+':3000/createEvent', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        userid: this.props.user.id      
        })
    })
    .then(response => response.json())
        .then(post => {
        if(post){
            console.log('postid', post)
            this.setState({
              title: '',
              description: ''
            })
            this.props.navigation.navigate('Home')
        }
        })
        .catch( err => console.log(err));
  }

  render() {
      var { title, description } = this.state;
    return (
        <Container>
        <Content>
          <Form>
            <Item>
              <Input placeholder="title"
                        label='title'
                        onChangeText={(title) => this.setState({ title })}
                        value={title}/>
            </Item>
            <Textarea rowSpan={5} bordered placeholder="description"
                label="description" onChangeText={(description) => this.setState({ description })} 
                value={description}/>
          </Form>

          <View style={styles.buttons}>
                <TouchableOpacity onPress={() => this.cancelCreateEvent()}>
                    <Icon name="ios-close-circle-outline"
                    style={styles.button}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.createEventAction() }>
                    <Icon name="ios-checkbox-outline"
                    style={styles.button}/>
                </TouchableOpacity>
            </View>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(CreateEvent);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttons:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
},
button:{
    color:'black', 
    fontSize:40,
    margin: 50
}
})
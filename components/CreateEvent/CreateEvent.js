import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardComponent from '../Card/CardComponent';
import {Container, Content, Header,Form, Item, Input, Icon } from 'native-base';
import {localhost} from '../../localhost';

export default class CreateEvent extends Component {


  constructor(props){
    super(props);
    this.state = {  
        eventid: '',
        postImg: '',
        postDescription: '',
    };
  }

  createEventAction = () => {
      console.log('create event action')
  }

  render() {
    return (
        <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="title" />
            </Item>
            <Item>
              <Input placeholder="Description" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardComponent from '../Card/CardComponent';
import {Container, Content, Icon } from 'native-base';

export default class Home extends Component {

  render() {
    return (
        <Container style={styles.container}>
          <Content>
            <CardComponent imageSource="1" likes="101"/>
            <CardComponent imageSource="2" likes="201"/>
            <CardComponent imageSource="3" likes="301"/>
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
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardComponent from '../Card/CardComponent';
import {Container, Content, Icon } from 'native-base';
import {localhost} from '../../localhost';

export default class Home extends Component {


  constructor(props){
    super(props);
    this.state = {  
        uid: '',
    };
  }

  getPosts = () => {
    // console.log('fetching data')
    // fetch('http://'+localhost+':3000/getEvents', {
    //     method: 'get',
    //     headers: {'Content-Type': 'application/json'},
    // })
    // .then(response => response.json())
    //   .then(post => {
    //     if(post.id){
    //       this.updatePost(post)
    //     }
    //   })
    //   .catch( err => console.log(err));
  }

  updatePost = (post) => {
    console.log('updating post', post)
  }
  
  componentDidMount(){
    this.getPosts();
  }


  render() {
    return (
        <Container style={styles.container}>
          <Content>
            <CardComponent button onPress={() => this.props.navigation.navigate('SignUp')} imageSource="1" likes="101"/>
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
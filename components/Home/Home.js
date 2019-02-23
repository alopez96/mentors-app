import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CardComponent from '../Card/CardComponent';
import {Container, Content, Header, Item,
   Input, Icon, Button, Text } from 'native-base';
import {localhost} from '../../localhost';

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {  
        uid: '',
        nameSearch: '',
    };
    this.userClick = this.userClick.bind(this);
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

  search = () => {
    const name = this.state.nameSearch
    console.log('search', name)
    fetch('http://'+localhost+':3000/findUser/' + name, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
      .then(users => {
        if(users){
          users.map(function (user) {
            console.log(user.id)
            console.log(user.name)
          })
          this.props.navigation.navigate('searchScreen')
        }
      })
      .catch( err => console.log(err));
  }

  userClick () {
    console.log('user clicked')
    this.props.navigation.navigate('User')
  }


  render() {
    return (
        <Container style={styles.container}>
          <Header searchBar rounded style={{marginTop: -35}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"
              label="nameSearch"
              onChangeText={(nameSearch) => this.setState({ nameSearch })}
              value={this.state.nameSearch}/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={() => this.search()}>
            <Text>Search</Text>
          </Button>
        </Header>
          <Content>
            <CardComponent userClick={this.userClick} imageSource="1" likes="101"/>
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
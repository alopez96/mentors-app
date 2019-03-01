import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CardComponent from '../Card/CardComponent';
import {Container, Content, Header, Item,
   Input, Icon, Button, Text } from 'native-base';
import {connect} from 'react-redux';
import {localhost} from '../../localhost';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {  
        uid: '',
        nameSearch: '',
        posts: []
    };
    this.userClicked = this.userClicked.bind(this);
  }

  getPosts = () => {
    fetch('http://'+localhost+':3000/getEvents/0', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
      .then(post => {
        if(post){
          console.log('number of posts', post.length)
          this.setState({
            posts: post
          })
        }
      })
      .catch( err => console.log(err));
  }
  
  componentDidMount(){
    this.getPosts();
  }

  search = () => {
    const name = this.state.nameSearch
    console.log('searchName', name)
    fetch('http://'+localhost+':3000/findUser/' + name, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(users => {
        if(users){
          this.props.findUsers(users)
          this.props.navigation.navigate('searchScreen')
        }
    })
    .catch( err => console.log(err));
  }

  userClicked () {
    console.log('user clicked')
    this.props.navigation.navigate('userScreen')
  }


  render() {
    const { posts } = this.state;
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
          {posts.map((post) => {
            return(
                <CardComponent userClicked={this.userClicked}
                  postTitle={post.title} 
                  postDesc={post.description}
                  postCreated={post.created}
                  userid={post.userid}
                  imageSource="1" likes="101"/>
            )
          })}
          </Content>
        </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findUsers: (users) => dispatch({
      type: 'FIND_USERS',
      payload: {
        users
      }
    })
  }
}

export default connect(null, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
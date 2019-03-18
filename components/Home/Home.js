import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CardComponent from './Card/CardComponent';
import { Container, Content, Header, Item,
   Input, Icon, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { localhost } from '../../localhost';

const awsPrefix = 'https://s3-us-west-2.amazonaws.com/mentorsdb-images/';

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

  search = () => {
    const name = this.state.nameSearch
    fetch('http://'+localhost+':3000/findUser/'+name, {
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

  userClicked (index) {
    this.props.viewUserid(index)
    this.props.navigation.navigate('userScreen')
  }
  
  getPosts = () => {
    fetch('http://'+localhost+':3000/getEvents', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
      .then(posts => {
        if(posts){
          this.props.storePostInStore(posts)
          this.setState({
            posts: posts
          })
        }
      })
      .catch( err => console.log(err));
  }
  
  componentDidMount(){
    this.getPosts();
  }

  cardClick = (post) => {
    this.props.viewPost(post)
    this.props.navigation.navigate('viewPost')
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
              <TouchableOpacity onPress={()=> this.cardClick(post)}>
                <CardComponent userClicked={this.userClicked}
                  postTitle={post.title} 
                  postDesc={post.description}
                  postCreated={post.created}
                  userid={post.userid}
                  imageurl={awsPrefix + post.imageurl}/>
              </TouchableOpacity>
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
    }),
    storePostInStore: (posts) => dispatch({
      type: 'GET_POSTS',
      payload: {
        posts
      }
    }),
    viewUserid: (userid) => dispatch({
      type: 'VIEW_USER',
      payload: {
        userid
      }
    }),
    viewPost: (post) => dispatch({
      type: 'SELECT_POST',
      payload: {
        post
      }
    }),
  }
}

export default connect(null, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
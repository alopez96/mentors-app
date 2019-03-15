import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import QuestionCard from './Card/QuestionCard';
import { Container, Content, Header, Item,
   Input, Icon, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { localhost } from '../../localhost';
import { awsPrefix } from './../../s3';

class Questions extends Component {

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
    fetch('http://'+localhost+':3000/findQuestion/'+name, {
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
    fetch('http://'+localhost+':3000/getQuestions', {
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
                <QuestionCard userClicked={this.userClicked}
                  postTitle={post.title} 
                  postDesc={post.description}
                  postCreated={post.created}
                  userid={post.userid}/>
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
    storePostInStore: (questions) => dispatch({
      type: 'GET_QUESTIONS',
      payload: {
        questions
      }
    }),
    viewUserid: (userid) => dispatch({
      type: 'VIEW_USER',
      payload: {
        userid
      }
    }),
  }
}

export default connect(null, mapDispatchToProps)(Questions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
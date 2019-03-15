import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, 
        Body, Left, Button, Icon } from 'native-base';
import { awsPrefix } from './../../../s3';

class QuestionCard extends React.Component {

  constructor() {
    super();
    this.state = {
        uid: '',
        name: '',
        userimage: '',
        isLoading: true
    }
  }

  postClicked = () => {
  }

  componentWillMount(){
    fetch('http://localhost:3000/profile/'+this.props.userid, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
      .then(user => {
        if(user){
          this.setState({
            uid: user.uid,
            name: user.name,
            userimage: awsPrefix + user.imageurl,
            isLoading: false
          })
        }
      })
      .catch( err => console.log(err));
}

  render() {

    const { postTitle, postDesc, postCreated, imageurl, userid } = this.props;
    const dateString = new Date(postCreated).toString().substring(0, 10)
    
    return (
      <Card>
        <CardItem>
          <Left>
            <TouchableOpacity onPress={() => this.props.userClicked(userid)}>
            <Thumbnail
              source= {{uri: this.state.userimage}}/>
            </TouchableOpacity>
            <Body>
              <Text style={{fontWeight:"700"}}> {this.state.name} </Text>
              <Text note> {dateString} </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text style={{fontWeight:"900"}}>{postTitle} </Text>
              {postDesc}              
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}


export default QuestionCard;
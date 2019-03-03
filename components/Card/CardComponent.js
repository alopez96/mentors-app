import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {Card, CardItem, Thumbnail, 
        Body, Left, Right, Button, Icon} from 'native-base';
import {localhost} from '../../localhost';

const awsPrefix = 'https://s3-us-west-2.amazonaws.com/mentorsdb-images/';

class CardComponent extends React.Component {

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
    console.log('post clicked')
  }

  componentWillMount(){
    fetch('http://'+localhost+':3000/profile/'+this.props.userid, {
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
    console.log('image', imageurl)
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
        <CardItem cardBody button onPress={() => this.postClicked}>
        <Thumbnail square style={{height:200, width:null, flex:1}}
         source= {{uri: imageurl}}/>
        </CardItem>
        <CardItem style={{height:45}}>
          <Left>
            <Button transparent>
              <Icon name="ios-heart"
                style={{color:'black'}}/> 
            </Button>
          </Left>
        </CardItem>
        <CardItem style={{height:35}}>
          <Text>{this.props.likes}</Text>
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


export default CardComponent;
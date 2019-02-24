import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {Card, CardItem, Thumbnail, 
        Body, Left, Right, Button, Icon} from 'native-base';

class CardComponent extends React.Component {

  postClicked = () => {
    console.log('post clicked')
  }


  render() {

    const { postTitle, postDesc, postCreated, userid } = this.props;
    const dateString = new Date(postCreated).toString().substring(0, 10)
    
    return (
      <Card>
        <CardItem>
          <Left>
            <TouchableOpacity onPress={() => this.props.userClicked()}>
              <Thumbnail source={require('../../images/barca.png')}/>
            </TouchableOpacity>
            <Body>
              <Text> userid {userid} </Text>
              <Text note> {dateString} </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody button onPress={() => this.postClicked}>
          <Image source={require('../../images/classico.jpg')}
            style={{height:200, width:null, flex:1}}/>
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
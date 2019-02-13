import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import {Card, CardItem, Thumbnail, 
        Body, Left, Right, Button, Icon} from 'native-base';

class CardComponent extends Component {

  render() {

    const images = {
      "1": "../../images/classico.jpg",
      "2": "../../images/classico.jpg",
      "2": "../../images/classico.jpg"
    }
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require('../../images/barca.png')}/>
            <Body>
              <Text>Name</Text>
              <Text note> Dec 15 </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={images[this.props.imageSource]}
            style={{height:200, width:null, flex:1}}/>
        </CardItem>
        <CardItem style={{height:45}}>
          <Left>
            <Button transparent>
              <Icon name="ios-heart"
                style={{color:'black'}}/> 
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles"
                style={{color:'black'}}/> 
            </Button>
            <Button transparent>
              <Icon name="ios-send"
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
              <Text style={{fontWeight:"900"}}>arturo </Text>
              tioregn ieorngvie anve
              argvn'iefvne'View
              nvoenv ea]Viewenfsoiv'ne shouldComponentUpdate              
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}


export default CardComponent;
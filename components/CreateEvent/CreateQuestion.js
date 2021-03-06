import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {Container, Content, Form, Item,
    Textarea, Input, Icon, Thumbnail } from 'native-base';
import {connect} from 'react-redux';
import {localhost} from '../../localhost';
import { RNS3 } from 'react-native-aws3';
import { ImagePicker, Permissions } from 'expo';
import { myAccessKey, mySecretKey, awsPrefix } from '../../s3';
import v1 from 'uuid/v1';

class CreateQuestion extends Component {

  constructor(props){
    super(props);
    this.state = {  
        subject: '',
        title: '',
        body: '',
        imageurl: '',
        uri: 'https://facebook.github.io/react/logo-og.png'
    };
  }

  askPermissionsAsync = async () => {
    // await Permissions.askAsync(Permissions.CAMERA);
    Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    try {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: false,
    });
    if (result.cancelled)
        return;
    const key = `${v1()}.jpeg`;
    const file = {
        uri: result.uri,
        type: 'image/jpeg',
        name: key
    };
    const options = {
        keyPrefix: 'post-images/',
        bucket: 'mentorsdb-images',
        region: 'us-west-2',
        accessKey: myAccessKey,
        secretKey: mySecretKey,
        successActionStatus: 201
    }
    await RNS3.put(file, options)
    .progress((e) => console.log(e.loaded / e.total))
    .then((response) => {
        this.setState({
            imageurl: response.body.postResponse.key,
            uri: awsPrefix + response.body.postResponse.key,
        });
    }).catch((err) => { console.log(err) });
    } catch (error) {
    console.log(error);
    };
};

  cancelCreateEvent = () => {
    this.props.navigation.navigate('Home')
  }

  createEventAction = () => {
    fetch('http://'+localhost+':3000/createQuestion', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            subject: this.state.subject,
            title: this.state.title,
            body: this.state.body,
            userid: this.props.user.id,
            imageurl: this.state.imageurl     
        })
    })
    .then(response => response.json())
        .then(post => {
        if(post){
            this.setState({
                subject: '',
                title: '',
                body: '',
                imageurl: ''
            })
            this.props.navigation.navigate('Home')
        }
        })
        .catch( err => console.log(err));
  }

  render() {
      var { subject, title, body } = this.state;
    return (
        <Container>
        <Content>
          <Form>
          <Item>
              <Input placeholder="subject"
                        label='subject'
                        onChangeText={(subject) => this.setState({ subject })}
                        value={subject}/>
            </Item>
            <Item>
              <Input placeholder="title"
                        label='title'
                        onChangeText={(title) => this.setState({ title })}
                        value={title}/>
            </Item>
            <Textarea rowSpan={5} bordered placeholder="body"
                label="body" onChangeText={(body) => this.setState({ body })} 
                value={body}/>
          </Form>

          <Content>
            <TouchableOpacity onPress={this.useLibraryHandler}>
                <Thumbnail square large style={styles.cameraIcon}
                 source= {{uri: this.state.uri}}/>
            </TouchableOpacity>
          </Content>    

          <View style={styles.buttons}>
                <TouchableOpacity onPress={() => this.cancelCreateEvent()}>
                    <Icon name="ios-close-circle-outline"
                    style={styles.button}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.createEventAction() }>
                    <Icon name="ios-checkbox-outline"
                    style={styles.button}/>
                </TouchableOpacity>
            </View>
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(CreateQuestion);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttons:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
},
button:{
    color:'black', 
    fontSize:40,
    margin: 50
},
cameraIcon:{
  margin:20,
  borderRadius: 2,
  alignSelf: 'center',
},
})
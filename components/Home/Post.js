import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { RNS3 } from 'react-native-aws3';
import { ImagePicker, Permissions } from 'expo';
import { myAccessKey, mySecretKey, awsPrefix } from '../../s3';
import v1 from 'uuid/v1';
import { Container, Form, Content, Card, CardItem, Item, Input,
     Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uid: '',
        name: '',
        userimage: '',
        match: false,
        mytitle: '',
        mydescription: '',
        myimageurl: '',
        isModalVisible: false,
        imageUpdated: false
    };
  }

  toogleModal = () => {
    this.setState({
        isModalVisible: !this.state.isModalVisible
    })
}

askPermissionsAsync = async () => {
    // await Permissions.askAsync(Permissions.CAMERA);
    Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

onChangePicture = async () => {
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
        keyPrefix: 'uploads/',
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
            myimageurl: awsPrefix + response.body.postResponse.key
        });
        this.uploadImage(response.body.postResponse.key)
    }).catch((err) => { console.log(err) });
    } 
    catch (error) { console.log(error) };
    };

    uploadImage = (imageurl) => {
    fetch('http://localhost:3000/editPost', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userid: this.state.uid,
            postid: this.props.post.postid,
            imageurl: imageurl
        })})
    .then(post => {
        if(post){
            this.setState({imageUpdated: true})
        }
        else{
            console.log('error updating image')
        }
        })
    .catch( err => console.log(err));
    }

  submitChanges = () => {
    const { mytitle, mydescription, myimageurl } = this.state;
    const { userid, postid } = this.props.post;
    if(userid != this.state.uid){
        console.log('user does not have permission to edit')
    }
    else{
        fetch('http://localhost:3000/editPost', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                postid: postid,
                title: mytitle,
                description: mydescription,
                imageurl: myimageurl,
                userid: this.state.uid
            })
        })
        .then(post => {
            if(post){
                this.setState({
                    isModalVisible: !this.state.isModalVisible
                })
            }
            else{
                console.log('error updating user')
            }
            })
        .catch( err => console.log(err));
    }
  }

  deletePost = () => {
    const { userid, postid } = this.props.post;
    if(userid != this.state.uid){
        console.log('user does not have permission to delete')
    }
    else{
        fetch('http://localhost:3000/deletePost', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                postid: postid,
                userid: this.state.uid
            })
        })
        .then(post => {
            if(post){
                console.log('deleted')
                this.setState({
                    isModalVisible: !this.state.isModalVisible
                })
            }
            else{
                console.log('error updating user')
            }
            })
        .catch( err => console.log(err));
    }
  }

  componentDidMount(){
    const { title, description, imageurl, userid } = this.props.post;
    this.setState({
        mytitle: title,
        mydescription: description,
        myimageurl: imageurl
    })
    fetch('http://localhost:3000/profile/'+userid, {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
      .then(user => {
        if(user){
          this.setState({
            uid: user.id,
            name: user.name,
            userimage: awsPrefix + user.imageurl
          })
        }
        if(user.id == this.props.post.userid){
            this.setState({ match: true })
        }
      })
      .catch( err => console.log(err));
  }

  render() {
      const { created, imageurl } = this.props.post;
      const { mytitle, mydescription, myimageurl } = this.state;
      const dateString = new Date(created).toString().substring(0, 10)
    
    return (
        <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.state.userimage}} />
                <Body>
                  <Text>{this.state.name}</Text>
                  <Text note>{dateString}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Thumbnail square style={{height:300, width:null, flex:1}}
            source= {{uri: awsPrefix+imageurl}}/>
            </CardItem>
            <CardItem>
            <Body>
                <Text>
                <Text style={{fontWeight:"900"}}>{mytitle} </Text>
                {mydescription}              
                </Text>
            </Body>
            </CardItem>
          </Card>
            {this.state.match != false
            ?<Button transparent onPress={this.toogleModal}>
                <Text>Edit</Text>
            </Button>
            :<Text>none</Text>}        
          
        </Content>

        <View>
            <Modal isVisible={this.state.isModalVisible}
            style={styles.modalStyle}>
            <View style={{ flex: 1, margin: 20 }}>
                <Form>
                <Item>
                    <Input placeholder="title"
                    label='title'
                    onChangeText={(mytitle) => this.setState({ mytitle })}
                    value={mytitle}
                        />
                </Item>
                <Item>
                    <Input placeholder="description"
                    label='description'
                    onChangeText={(mydescription) => this.setState({ mydescription })}
                    value={mydescription}
                        />
                </Item>
                </Form>   
                <View style={styles.modalButtons}>
                <TouchableOpacity onPress={this.toogleModal}>
                    <Icon name="ios-arrow-dropleft"
                    style={styles.modalButton}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.submitChanges() }>
                    <Icon name="ios-checkbox-outline"
                    style={styles.modalButton}/>
                </TouchableOpacity>
                </View>
                {this.state.imageUpdated == false
                ?
                <Content>
                <Button transparent onPress={() => this.onChangePicture()}>
                    <Text>Change picture</Text>
                </Button>
                <Button transparent danger onPress={() => this.deletePost()}>
                    <Text>Delete Post</Text>
                </Button>
                </Content>
                :<Button transparent disabled={true} onPress={() => this.onChangePicture()}>
                    <Text>Image updated</Text>
                </Button>
                }
            </View>
            </Modal>
            </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps)(Post);

const styles = StyleSheet.create({
    modalStyle:{
        backgroundColor: 'white',
        padding: 10,
        marginTop: 50,
        marginRight: 20,
        marginBottom: 30,
        marginLeft: 20,
        borderRadius: 10 
    },
    modalButtons:{
        
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalButton:{
        color:'black', 
        fontSize:40,
        margin: 10
    }
});
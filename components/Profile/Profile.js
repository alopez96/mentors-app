
import React, { Component } from 'react';
import { View, StyleSheet, Text,
    TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import { Button, Icon } from 'native-base';
import Modal from 'react-native-modal';
import { Thumbnail, Form, Item, Input } from 'native-base';
import { localhost } from '../../localhost';
import { RNS3 } from 'react-native-aws3';
import { ImagePicker, Permissions } from 'expo';
import { myAccessKey, mySecretKey } from '../../s3';
import v1 from 'uuid/v1';
import Loader from '../Spinner/Loader';

const awsPrefix = 'https://s3-us-west-2.amazonaws.com/mentorsdb-images/';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            imageurl: awsPrefix + '',
            major: '',
            city: '',
            bio: '',
            isModalVisible: false,
            isLoading: true
        }
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
                imageurl: awsPrefix + response.body.postResponse.key
            });
            this.uploadImage(response.body.postResponse.key)
        }).catch((err) => { console.log(err) });
        } catch (error) {
        console.log(error);
        };
  };

  uploadImage = (imageurl) => {
    fetch('http://'+localhost+':3000/editProfile', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userid: this.props.user.id,
            imageurl: imageurl
        })
    })
    .then(user => {
        if(user){
            console.log('profile image updated', user)
        }
        else{
            console.log('error updating profile image')
        }
        })
    .catch( err => console.log(err));
    }

    toogleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    submitChanges = () => {
        fetch('http://'+localhost+':3000/editProfile', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userid: this.props.user.id,
                name: this.state.name,
                major: this.state.major,
                city: this.state.city,
                bio: this.state.bio,
            })
        })
        .then(user => {
            if(user){
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

    async componentDidMount(){
        const response = await fetch('http://'+localhost+':3000/profile/'+this.props.user.id, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
        const user = await response.json();
        this.setState({
            name: this.props.user.name,
            email: this.props.user.email,
            imageurl: awsPrefix + user.imageurl,
            major: this.props.user.major,
            city: this.props.user.city,
            bio: this.props.user.bio,
            isLoading: false
        })
    }

    render() {

        var {name, email, major, city, bio, isLoading} = this.state;
        if (isLoading) return <Loader />; 
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Button style={styles.editButton} 
                onPress={this.toogleModal}>
                <Icon name="ios-create"
                    style={{color:'black'}}/> 
            </Button>
            <View style={{ height: 120, backgroundColor: '#c0c0c0' }}></View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.onChangePicture()}>
                    <Thumbnail style={styles.image} source= {{uri: this.state.imageurl}}/>
                </TouchableOpacity>  
            
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.aboutText}>{email}</Text>
            {major && (major.length > 0)
                ?<Text style={{marginLeft: 10}}>
                   Major: <Text style={styles.aboutText}>{major} </Text>
                </Text>
                :null
            }
            {city && (city.length > 0)
                ?<Text style={{marginLeft: 10}}>
                   City: <Text style={styles.aboutText}>{city} </Text>
                </Text>
                :null
            }
            {bio && (bio.length > 0)
                ?<Text style={{marginLeft: 10}}>
                   Bio: <Text style={styles.aboutText}>{bio} </Text>
                </Text>
                :null
            }              

            <View>
                <Modal isVisible={this.state.isModalVisible}
                style={styles.modalStyle}>
                <View style={{ flex: 1, margin: 20 }}>
                    <Form>
                    <Item>
                            <Input placeholder="name"
                            label='name'
                            onChangeText={(name) => this.setState({ name })}
                            value={name}
                             />
                        </Item>
                        <Item>
                            <Input placeholder="major"
                            label='major'
                            onChangeText={(major) => this.setState({ major })}
                            value={major}
                             />
                        </Item>
                        <Item last>
                            <Input placeholder="city"
                            label='city'
                            onChangeText={(city) => this.setState({ city })}
                            value={city}
                             />
                        </Item>
                        <Item last>
                            <Input placeholder="tell your friends about you"
                            label='bio'
                            onChangeText={(bio) => this.setState({ bio })}
                            value={bio}
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
                </View>
                </Modal>
            </View>

    </KeyboardAvoidingView>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#000',
        paddingTop:50,
        paddingBottom:10,
        flexDirection:'row'    
    },
    toolbarButton:{
        width: 50,            
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1                
    },
     avatar: {
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#fff",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 110
    },
    image: {    
        width:100,
        height: 100,
        margin: 4,
        borderRadius: 50,
    },
    nameText:{
        marginTop: 100,
        fontSize: 24,
        marginLeft: 10,
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    aboutText:{
        marginLeft: 10,
        marginTop: 20,
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    editButton:{
        backgroundColor:'white',
        margin: 10,
        alignSelf: 'flex-end',
        fontSize: 40
    },
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalButton:{
        color:'black', 
        fontSize:40,
        margin: 10
    }
});

    
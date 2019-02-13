
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, 
    TouchableOpacity,KeyboardAvoidingView,
    ScrollView,TextInput } from 'react-native';
import Toast, {DURATION} from'react-native-easy-toast';
import {connect} from 'react-redux';
import { Button, Icon } from 'native-base';
import Modal from 'react-native-modal';
import { Container, Header, Content, 
    Form, Item, Input } from 'native-base';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            img: 'http://shpeboston.org/wp-content/uploads/2017/11/shpe-logo.png',
            isModalVisible: false,
            major: '',
            city: ''
        }
    }

    onChangePicture = () => {
        console.log('change image')
    }

    toogleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    submitChanges = () => {
        // fetch('http://'+localhost+':3000/updateAccount', {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //     city: this.state.city,
        //     major: this.state.major        
        //     })
        // })
        // .then(response => response.json())
        // .then(user => {
        //     if(user.id){
        //         this.setState({
        //             isModalVisible: !this.state.isModalVisible
        //         })
        //     }
        //     })
        // .catch( err => console.log(err));
    }

    render() {

        var {major, city} = this.state;
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Button style={styles.editButton} 
                onPress={this.toogleModal}>
                <Icon name="ios-create"
                    style={{color:'black'}}/> 
            </Button>
            <View style={{ height: 160, backgroundColor: '#c0c0c0' }}></View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.onChangePicture()}>
                    <Image style={styles.imageAvatar} 
                    source={{ uri: this.state.img }} />
                </TouchableOpacity>
               
            
            <Text style={styles.nameText}>{this.props.user[0].name}</Text>
            <Text style={styles.aboutText}>{this.props.user[0].email}</Text>
            {major.length > 0
                ?<Text style={{marginLeft: 10}}>
                   Major: <Text style={styles.aboutText}>{major} </Text>
                </Text>
                :null
            }
            {city.length > 0
                ?<Text style={{marginLeft: 10}}>
                   City: <Text style={styles.aboutText}>{city} </Text>
                </Text>
                :null
            }            

            <View>
                <Modal isVisible={this.state.isModalVisible}
                style={styles.modalStyle}>
                <View style={{ flex: 1, margin: 10 }}>
                    <Form>
                        <Item>
                            <Input placeholder="name"
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
        user: state
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
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#fff",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 110
    },
    imageAvatar: {
        width: 130,
        height: 130,
        borderRadius: 70,
        alignSelf: 'center',
        position: 'relative'
    },
    nameText:{
        marginTop: 100,
        fontSize: 24,
        marginLeft: 10,
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    aboutText:{
        margin: 10,
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

    
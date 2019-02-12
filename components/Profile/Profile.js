
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,KeyboardAvoidingView,ScrollView,TextInput } from 'react-native';
import Toast, {DURATION} from'react-native-easy-toast';
import {connect} from 'react-redux';
import {Card, CardItem, Thumbnail, 
    Body, Left, Right, Button, Icon} from 'native-base';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            img: 'http://shpeboston.org/wp-content/uploads/2017/11/shpe-logo.png'
        }
    }

    onChangePicture = () => {
        console.log('change image')
    }

    onPressEdit = () => {
        console.log('edit pressed')
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={{ height: 160, backgroundColor: '#c0c0c0' }}></View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.onChangePicture()}>
                    <Image style={styles.imageAvatar} 
                    source={{ uri: this.state.img }} />
                </TouchableOpacity>
               
            
        <Text style={styles.nameText}>{this.props.user[0].name}</Text>
        <Text style={styles.aboutText}>{this.props.user[0].email}</Text>
        <Button style={styles.editButton} 
            onPress={this.onPressEdit}>
            <Icon name="ios-create"
                style={{color:'black'}}/> 
        </Button>

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
        justifyContent: 'center'
    },
    aboutText:{
        margin: 10,
        justifyContent: 'center'
    },
    editButton:{
        backgroundColor:'white',
        margin: 10
    }
 
});

    
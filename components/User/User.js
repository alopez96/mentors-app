
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, 
    TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import { Button, Icon } from 'native-base';


export class User extends Component {
    constructor() {
        super();
        this.state = {
            img: 'http://shpeboston.org/wp-content/uploads/2017/11/shpe-logo.png',
            major: '',
            city: ''
        }
    }

    submitChanges = () => {
        
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
                <TouchableOpacity style={styles.avatar}>
                    <Image style={styles.imageAvatar} 
                    source={{ uri: this.state.img }} />
                </TouchableOpacity>
               
            
            <Text style={styles.nameText}>name</Text>
            <Text style={styles.aboutText}>about</Text>     

    </KeyboardAvoidingView>
    );
    }
}

const styles = StyleSheet.create({
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
});

    
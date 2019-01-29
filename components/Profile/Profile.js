import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: 'arturo',
            img: 'http://shpeboston.org/wp-content/uploads/2017/11/shpe-logo.png'
        }
    }

    componentWillMount() {
        //get user account here
    };

    render() {
        return (
            <View>
                <View style={{ height: 180, backgroundColor: '#c8c8c8' }}>    
                </View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.changePicture()}>
                    <Image style={styles.imageAvatar} 
                    source={{ uri: this.state.img }} />
                </TouchableOpacity>

                <Text style={styles.nameText}>{this.state.name}</Text>
            </View>

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
        borderRadius: 63,
        alignSelf: 'center',
        position: 'relative'
    },
    nameText:{
        textAlign: 'center',
        marginTop: 100,
        fontSize: 28,
        justifyContent: 'center'
    }
});

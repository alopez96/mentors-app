
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,KeyboardAvoidingView,ScrollView,TextInput } from 'react-native';
import Toast, {DURATION} from'react-native-easy-toast';
import {connect} from 'react-redux';


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            img: 'http://shpeboston.org/wp-content/uploads/2017/11/shpe-logo.png'
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
             <View>
                <View style={styles.toolbar}>
                     <Text style={styles.toolbarTitle}>Profile</Text>
                <TouchableOpacity>
                    <Text style={styles.toolbarButton} onPress={() => this.props.navigation.navigate('EditProfile')}>
                    Edit</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 120, backgroundColor: '#0193ed' }}>    
                </View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.changePicture()}>
                    <Image style={styles.imageAvatar} 
                    source={{ uri: this.state.img }} />
                </TouchableOpacity>
               
            
<Text style={styles.nameText}>{this.props.onnameInputChange}</Text>
<Text style={styles.homeTownText}>{this.props.onhomeTownInputChangel}</Text>
<Text style={styles.updateNameText} onPress={this.onPressTitle}>
{this.state.nameText}{'\n'}{'\n'}
</Text>

           
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
    nameText:{
        textAlign: 'center',
        marginTop: 100,
        fontSize: 28,
        justifyContent: 'center'

    },
    updateNameText: {
        fontSize: 9,
        color:'#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        bottom: '100%'
    },
    updatehomeTownText: {
        fontSize: 9,
        color:'#fff',
        fontWeight: 'bold',
        position: 'absolute',
        alignSelf: 'center',
        bottom: '100%'
     },
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
    formContainer:{
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      },
 
});

    
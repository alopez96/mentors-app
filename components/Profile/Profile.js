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
           
           
                <View style={{ height: 160, backgroundColor: '#0193ed' }}>    
                </View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.changePicture()}>
                    <Image style={styles.imageAvatar} 
                    source={{ uri: this.state.img }} />
                </TouchableOpacity>
               
                <Text style={styles.nameText}>{this.props.user[0].name}</Text>
                <Text style={styles.aboutText}>{this.props.user[0].email}</Text>
                <Text style={styles.updateNameText} onPress={this.onPressTitle}>
          {this.state.nameText}{'\n'}{'\n'}
        </Text>
        <View styles={styles.formContainer} >
        <ScrollView 
            scrollEnabled={true}
        >
            
            <TextInput 
            style={styles.input} 
            placeholder='Name' 
            returnKeyType='next'
            onChangeText={this.props.onnameInputChange}
            autoCapitalize='none'
            autoCorrect={false}
            />
            <TextInput 
            style={styles.input2} 
            placeholder='Home Town' 
            returnKeyType='next'
            onChangeText={this.props.onhomeTownInputChange}
            autoCapitalize='none'
            autoCorrect={false}
            />
           <TouchableOpacity style={styles.buttonContainer} >
                <Text style={styles.buttonText} 
            
                returnKeyType='go'
                onPress={this.validateInput}>Save</Text>
            </TouchableOpacity>
        </ScrollView> 
        </View>
        <Toast ref="toast"/>
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
    input: {
        height: 40,
        backgroundColor: '#0193ED',
        borderRadius: 50,
        margin: 30,
        marginBottom: 80,
        color: '#fff',
        paddingHorizontal: 10
    },
    input2: {
        height: 40,
        backgroundColor: '#0193ED',
        borderRadius: 50,
        margin: 30,
        marginBottom: 80,
        color: '#fff',
        paddingHorizontal: 10
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
        borderRadius: 63,
        alignSelf: 'center',
        position: 'relative'
    },
    formContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    nameText:{
        textAlign: 'center',
        marginTop: 100,
        fontSize: 28,
        justifyContent: 'center'
    },
    aboutText:{
        textAlign: 'center',
        marginTop: 10,
        fontSize: 28,
        justifyContent: 'center'
    },
    updateNameText: {
        fontSize: 9,
        color:'#fff',
        fontWeight: 'bold',
        position: 'absolute',
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
    buttonText:{
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',   
        
       },
       buttonContainer:{
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 50,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 110
        
       
       }
});

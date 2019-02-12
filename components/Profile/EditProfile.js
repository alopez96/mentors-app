
import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,KeyboardAvoidingView,ScrollView,TextInput } from 'react-native';
import ProfileForm from './ProfileForm';
import Toast, {DURATION} from'react-native-easy-toast';
import {connect} from 'react-redux';


class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            img: 'http://shpeboston.org/wp-content/uploads/2017/11/shpe-logo.png'
        }
    }

    onNameInputChange = (nameInput) => {
        this.setState({name: nameInput});
    }

    onHomeTownInputChange = (homeTownInput) => {
        this.setState({homeTown: homeTownInput});
    }

    onSchoolInputChange = (schoolInput) => {
        this.setState({school: schoolInput});
    }


    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
           
           <View>
                <View style={styles.toolbar}>
                 <TouchableOpacity>
                    <Text style={styles.toolbarButton} onPress={() => this.props.navigation.navigate('Profile')}>
                    Back</Text>
                </TouchableOpacity> 
                    <Text style={styles.toolbarTitle}>Profile</Text>
                
                </View>
            </View>

                <View style={{ height: 120, backgroundColor: '#0193ed' }}>    
                </View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.changePicture()}>
                    <Image style={styles.imageAvatar} 
                    source={{ uri: this.state.img }} />
                </TouchableOpacity>
               
<View styles={styles.formContainer} >
            <ProfileForm
                onNameInputChange={this.onNameInputChange}
                onHomeTownInputChange={this.onHomeTownInputChange}>
                onSchoolInputChange={this.onSchoolInputChange}>
             </ProfileForm>
            
            <TouchableOpacity style={styles.buttonContainer} >
                <Text style={styles.buttonText} 
                returnKeyType='go'
                onPress={this.validateInput}>Save</Text>
            </TouchableOpacity>

            
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
       
        
       
       }
});
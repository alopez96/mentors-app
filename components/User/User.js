
import React, { Component } from 'react';
import { View, StyleSheet, Text, 
    TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { Button, Icon } from 'native-base';
import { Thumbnail } from 'native-base';
import { localhost } from '../../localhost';
import { connect } from 'react-redux';
import Loader from '../Spinner/Loader';

const awsPrefix = 'https://s3-us-west-2.amazonaws.com/mentorsdb-images/';

class User extends Component {
    constructor() {
        super();
        this.state = {
            userid: '',
            name: '',
            email: '',
            imageurl: '',
            major: '',
            city: '',
            bio: '',
            isLoading: true
        }
    }

    onPictureZoom = () => {
        console.log('click image')
    }

    componentDidMount(){
        console.log('userid inside user', this.props.userid);
        fetch('http://'+localhost+':3000/profile/'+this.props.userid, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(user => {
            this.setState({
                name: user.name,
                email: user.email,
                imageurl: awsPrefix + user.imageurl,
                major: user.major,
                city: user.city,
                bio: user.bio,
                isLoading: false
            })
        })
        .catch( err => console.log(err));
    }

    render() {
        const { name, email, imageurl, major, city, bio, isLoading } = this.state;
        if (isLoading) return <Loader />; 
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={{ height: 120, backgroundColor: '#c0c0c0' }}></View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.onPictureZoom()}>
                    <Thumbnail style={styles.image} source= {{uri: imageurl}}/>
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
    </KeyboardAvoidingView>
    );
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users,
        posts: state.posts,
        userid: state.userid
    }
  }
  
export default connect(mapStateToProps)(User);

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
        marginTop: 80
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
});

    
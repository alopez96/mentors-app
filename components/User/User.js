
import React, { Component } from 'react';
import { View, StyleSheet,
    TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
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
    }

    componentDidMount(){
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
            <Content>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.onPictureZoom()}>
                    <Thumbnail style={styles.image} source= {{uri: imageurl}}/>
                </TouchableOpacity>
            
            
            <Container>
                <Content>
                <Header />
                <Card style={{height:200, width:null, flex:1}}>
                    <Body>
                    <Text style={styles.nameText}>{name}</Text>
                    </Body>
                    <Body>
                        <Text style={styles.aboutText}>{email}</Text>
                        {major && (major.length > 0)
                            ?<Text>
                            Major: <Text style={styles.aboutText}>{major} </Text>
                            </Text>
                            :null
                        }
                    </Body>
                    <Body>
                    {city && (city.length > 0)
                    ?<Text>
                    City: <Text style={styles.aboutText}>{city} </Text>
                    </Text>
                    :null
                    }
                    </Body>
                    <Body>
                        {bio && (bio.length > 0)
                        ?<Text>
                        Bio: <Text style={styles.aboutText}>{bio} </Text>
                        </Text>
                        :null
                        }
                    </Body>
                    
                </Card>
                </Content>
                </Container>              
    </Content>
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
        borderColor: "#c0c0c0",
        marginBottom: 10,
        alignSelf: 'center',
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
        fontSize: 24,
        marginTop: 20,
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    aboutText:{
        justifyContent: 'center',
        fontWeight: 'bold'
    },
});

    
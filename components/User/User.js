
import React, { Component } from 'react';
import { View, StyleSheet, Text, 
    TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { Button, Icon } from 'native-base';
import { Thumbnail } from 'native-base';
import { connect } from 'react-redux';


class User extends Component {
    constructor() {
        super();
        this.state = {
            postids: [],
        }
    }

    onPictureZoom = () => {
        console.log('click image')
    }

    componentDidMount(){
        console.log('get posts from store', this.props.posts)
        const { post } = this.state;
        this.props.posts[0].map(function (posted) {
          postids.push(posted.id)
        })
    }

    render() {

        var { name, email, major, city, bio } = this.state;
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Button style={styles.editButton} 
                onPress={this.toogleModal}>
                <Icon name="ios-create"
                    style={{color:'black'}}/> 
            </Button>
            <View style={{ height: 120, backgroundColor: '#c0c0c0' }}></View>
                <TouchableOpacity style={styles.avatar} 
                    onPress={() => this.onPictureZoom()}>
                    <Thumbnail style={styles.image} source={require('../../images/barca.png')}/>
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
        user: state.user
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

    
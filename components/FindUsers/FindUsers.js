import React from 'react';
import {StyleSheet, Text,  View, TouchableOpacity} from 'react-native';
import {Content, Card, CardItem, Thumbnail} from 'native-base';
import {connect} from 'react-redux';

const awsPrefix = 'https://s3-us-west-2.amazonaws.com/mentorsdb-images/';

class FindUsers extends React.Component {

  constructor() {
    super();
    this.state = {
        uids: [],
    }
  }

  userClicked (index) {
    this.props.viewUserid(index)
    this.props.navigation.navigate('userScreen')
  }

  componentDidMount(){
    const { uids } = this.state;
    this.props.users[0].map(function (users) {
      uids.push(users.id)
    })
  }

  render() {    
    console.log('user', this.props.users)
    return (
      <View style={styles.container}>
        <Content>
        {this.props.users[0].map((user) => {
          return(
          <Card>
            <CardItem>
            <TouchableOpacity onPress={() => this.userClicked(user.id)}>
              <Thumbnail button
                source= {{uri: awsPrefix + user.imageurl}}/>
            </TouchableOpacity>
              <Text style={{marginLeft:10}}>{user.name} • </Text>
              {user.city && (user.city.length > 0)
              ?<Text>{user.city} • </Text>
              :null}
              {user.major && (user.major.length > 0)
              ?<Text>{user.major}</Text>
              :null}
             </CardItem>
           </Card>
          )})}
        </Content>
      </View> 

    );
  }
}


const mapStateToProps = (state) => {
  return {
      users: state.users
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    viewUserid: (userid) => dispatch({
      type: 'VIEW_USER',
      payload: {
        userid
      }
    }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FindUsers);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

import React from 'react';
import { StyleSheet, Text,  View } from 'react-native';
import { Content, Card, CardItem, Thumbnail } from 'native-base';
import { connect } from 'react-redux';

class FindUsers extends React.Component {

  constructor() {
    super();
    this.state = {
        uids: [],
    }
  }

  render() {    
    return (
      <View style={styles.container}>
        <Content>
        {this.props.users[0].map((user) => {
          return(
          <Card>
            <CardItem>
              <Thumbnail source={require('../../images/barca.png')}
                button />
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

export default connect(mapStateToProps)(FindUsers);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

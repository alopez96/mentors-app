import React from 'react';
import { StyleSheet, Text,  View} from 'react-native';
import {connect} from 'react-redux';

class FindUsers extends React.Component {

  constructor() {
    super();
    this.state = {
        uids: [],
    }
}

  componentDidMount(){
    const { uids } = this.state;
    console.log('findUsers props from store', this.props.users[0])
    this.props.users[0].map(function (users) {
      uids.push(users.id)
    })
}

  render() {    
    return (
      <View style={styles.container}>
          {this.props.users[0].map((user) => {
            return(
            <Text>
              {user.name}
            </Text>
            )
          })}
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

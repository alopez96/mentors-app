import React from 'react';
import { StyleSheet, Text,  View} from 'react-native';

class FindUsers extends React.Component {

  render() {    
    return (
      <View style={styles.container}>
          <Text>
              Find Users
          </Text>
      </View>
    );
  }
}


export default FindUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

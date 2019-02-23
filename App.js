import React from 'react';
import { StyleSheet, Text,  View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './store';

import SwitchNavigation from './components/route';

export default class App extends React.Component {

  render() {    
    return (
      <SafeAreaView style={styles.container} 
      forceInset={{'top': 'never', 'bottom': 'never'}}>
        <Provider store={store}> 
          <SwitchNavigation/>
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

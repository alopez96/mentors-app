import React from 'react';
import { createStackNavigator, createAppContainer,
     createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import Profile from './Profile/Profile';


export const AppBottomNavigator = createBottomTabNavigator({
    Home:{
        screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <MaterialIcons name="ios-home" size={46} color={tintColor} />
                )
            }
    },
    Profile:{
        screen: Profile
    }
})

export const AppStackNavigator = createStackNavigator({
    Main: AppBottomNavigator
})


export const SwitchNavigation = createSwitchNavigator({
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
    App: {
        screen: AppStackNavigator
    },
});



export default createAppContainer(SwitchNavigation);

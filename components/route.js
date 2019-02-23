import React from 'react';
import { createStackNavigator, createAppContainer,
     createSwitchNavigator, createBottomTabNavigator } 
     from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import ForgotPassword from './Login/ForgotPassword';
import CreateEvent from './CreateEvent/CreateEvent';
import FindUsers from './FindUsers/FindUsers';
import User from './User/User';


export const AppBottomNavigator = createBottomTabNavigator({
    Home:{
        screen: Home,
            navigationOptions: {
                tabBarLabel: () => { },
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-home" size={40} color={tintColor} />
                ),
            }
    },
    Profile:{
        screen: Profile,
        navigationOptions: {
            tabBarLabel: () => { },
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-person" size={40} color={tintColor} />
            )
        }
    },
    Add:{
        screen: CreateEvent,
        navigationOptions:{
            tabBarLabel: () => { },
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-add-circle" size={40} color={tintColor} />
            )
        }
    }
},  {
    order: ['Home', 'Add', 'Profile']
})

export const AppStackNavigator = createStackNavigator({
    Main: AppBottomNavigator,
    searchScreen: FindUsers,
    userScreen: User,
    // eventScreen: Event,
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
    Forgot:{
        screen: ForgotPassword
    },
});


export default createAppContainer(SwitchNavigation);

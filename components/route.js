import React from 'react';
import { createStackNavigator, createAppContainer,
     createSwitchNavigator, createBottomTabNavigator } 
     from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import Questions from './Home/Questions';
import Profile from './Profile/Profile';
import ForgotPassword from './Login/ForgotPassword';
import CreateEvent from './CreateEvent/CreateEvent';
import CreateQuestion from './CreateEvent/CreateQuestion';
import FindUsers from './FindUsers/FindUsers';
import User from './User/User';
import Option from './CreateEvent/Option';


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
        screen: Option,
        navigationOptions:{
            tabBarLabel: () => { },
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-add-circle" size={40} color={tintColor} />
            )
        }
    },
    Question:{
        screen: Questions,
        navigationOptions:{
            tabBarLabel: () => { },
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-clipboard" size={40} color={tintColor} />
            )
        }
    },
},  {
    order: ['Question', 'Home', 'Add', 'Profile']
})

export const AppStackNavigator = createStackNavigator({
    Main: AppBottomNavigator,
    searchScreen: FindUsers,
    userScreen: User,
    createEvent: CreateEvent,
    createQuestion: CreateQuestion
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

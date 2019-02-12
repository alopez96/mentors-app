import React from 'react';
import { createStackNavigator, createAppContainer,
     createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';


import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import Profile from './Profile/Profile';
//import EditProfile from './Profile/EditProfile';
import ForgotPassword from './Login/ForgotPassword';


export const AppBottomNavigator = createBottomTabNavigator({
    Home:{
        screen: Home,
            navigationOptions: {
                tabBarLabel: () => {
                    display: false
                },
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-home" size={40} color={tintColor} />
                )
            }
    },
    Profile:{
        screen: Profile,
        navigationOptions: {
            tabBarLabel: () => {
                display: false
            },
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-person" size={40} color={tintColor} />
            )
        }
    },
},  {
    order: ['Home', 'Profile']
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
    Forgot:{
        screen: ForgotPassword
    },
    // Profile:{
    //     screen: EditProfile
    // }
});



export default createAppContainer(SwitchNavigation);

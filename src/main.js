import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import CardBalance from './myki/balance'
import Login from './myki/login';

const RootStack = createStackNavigator(
    {
        Login: Login,
        Balance: CardBalance
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        cardStyle: {
            backgroundColor: 'white'
        }
    }
)

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            formSubmitted: false,
            email: '',
            password: ''
        }
    }

    render() {
       return  <RootStack />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
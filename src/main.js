import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import CardBalance from './containers/balance'
import Login from './containers/login';
import Auth from './containers/auth';
import Splash from './containers/splash';

const RootStack = createStackNavigator(
    {
        Login: Login,
        Auth: Auth,
        Balance: CardBalance,
        Splash: Splash
    },
    {
        initialRouteName: 'Splash',
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

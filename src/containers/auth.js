import React, { Component } from 'react';
import { Vibration, Alert } from 'react-native'

import { getData } from '../actions/data'

import { BaseContainer } from '../components/baseContainer'
import Greeting from '../components/greeting'
import Card from '../components/card'
import { H1 } from '../components/typography'

export default class Auth extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount(){
        const { navigation } = this.props;
    
        let username = navigation.getParam('username');
        let password = navigation.getParam('password');
        
        try {
            await getData(username, password);
        } catch(e) {
            Vibration.vibrate();
            Alert.alert('Login failed', error, [{text: 'Try again', onPress: () => this.props.navigation.navigate('Login') }])
        }

        this.props.navigation.navigate("Balance")
      }

    render(){
        return(
            <BaseContainer>
                <Card />
                <Greeting />
                <H1>Logging you in...</H1>
            </BaseContainer>
        )
    }
}
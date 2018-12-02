import React, { Component } from 'react';
import { Vibration, Alert, Animated, Easing } from 'react-native'
import styled from 'styled-components'

import { getData } from '../actions/data'

import { BaseContainer } from '../components/baseContainer'
import Greeting from '../components/greeting'
import Card from '../components/card'
import { H1 } from '../components/typography'

const TopPadding = styled.View`
    padding-top: 60px;
`

const AnimatedH1 = Animated.createAnimatedComponent(H1)

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(0)
        }
    }

    async componentDidMount(){
        const { navigation } = this.props;
    
        let username = navigation.getParam('username');
        let password = navigation.getParam('password');

        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                        easing: Easing.in(Easing.ease)
                    }),
                    Animated.timing(this.state.translateY, {
                        toValue: 5,
                        duration: 1000,
                        useNativeDriver: true,
                        easing: Easing.in(Easing.ease)
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(this.state.opacity, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                        delay: 250,
                    }),
                    Animated.timing(this.state.translateY, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                        delay: 250,
                    }),
                ]),
            ])
        ).start()

        try {
            await getData(username, password);
            this.props.navigation.navigate("Balance")
        } catch(e) {
            Vibration.vibrate();
            Alert.alert(
                'Login failed', 
                'Invalid username/password', 
                [
                    {text: 'Try again', onPress: () => this.props.navigation.navigate('Login') }
                ],
                { cancelable: false }
            )
        }
      }

    render(){
        let { opacity, translateY } = this.state

        return(
            <BaseContainer>
                <TopPadding />
                <Card />
                <Greeting />
                <AnimatedH1 style={{ opacity: opacity, transform: [ {translateY: translateY} ] }}>Logging in...</AnimatedH1>
            </BaseContainer>
        )
    }
}
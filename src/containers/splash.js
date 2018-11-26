import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

export default class Splash extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let storedBalance = await AsyncStorage.getItem('MYKI_DATA');
        if (storedBalance !== null) {
            this.props.navigation.navigate('Balance', {
                refresh: true
            });
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return <View></View>
    }
}
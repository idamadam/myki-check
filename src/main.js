import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CardBalance from './myki/balance'
import Login from './myki/login';

export default class MykiCheck extends Component {
    constructor(props){
        super(props);
        this.state = {
            formSubmitted: false,
            email: '',
            password: ''
        }
    }

    _handleLogin = (email, password) => {
        this.setState({
            formSubmitted: true,
            email: email,
            password: password
        });
    }

    render() {
        if (this.state.formSubmitted) {
             return (
                <View style={styles.container}>
                    <CardBalance username={this.state.email} password={this.state.password} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Login handleLogin={this._handleLogin} />
            </View>
        )
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
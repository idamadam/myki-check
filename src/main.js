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

    _submitForm = (email, password) => {
        this.setState({
            formSubmitted: true,
            email: email,
            password: password
        });
    }

    _logout = () => {
        this.setState({
            formSubmitted: false
        })
    }

    render() {
        if (this.state.formSubmitted) {
             return (
                <View style={styles.container}>
                    <CardBalance username={this.state.email} password={this.state.password} loginFailed={this._logout} logout={this._logout} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Login submitForm={this._submitForm} />
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
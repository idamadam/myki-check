import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert  } from 'react-native';
import { SecureStore } from 'expo';

import Input from '../components/textinput'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    _updateEmail = (text) => {
        this.setState({
            email: text
        })
    }

    _updatePassword = (text) => {
        this.setState({
            password: text
        })
    }

    _login = (username, password) => {
        this.props.navigation.navigate('Auth', {
            username: username,
            password: password
        })
    }

    _onPress = async () => {
        email = this.state.email;
        password = this.state.password;

        if (email.length == 0 || password.length == 0) {
            Alert.alert('Please fill in form');
        } else {
            this._login(email, password);
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.h1}>Login</Text>
                <Input
                    label="Username"
                    onChangeText={this._updateEmail}
                    placeholder={this.state.email}
                    autoCapitalize='none'
                    autoCorrect={false}

                />
                <Input
                    label="Password"
                    onChangeText={this._updatePassword}
                    placeholder={this.state.password}
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <Button
                    style={styles.login}
                    onPress= {this._onPress}
                    title="Login" 
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 80
    },
    login: {
        backgroundColor: '#007AFF',
        width: 306,
        color: '#FFFFFF'
    },
    h1: {
        fontSize: 64,
        fontWeight: '900',
        width: 306,
        marginBottom: 32
    }
});
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TextInput, StyleSheet, Button, Alert  } from 'react-native';

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

    _onPress = () => {
        this.props.handleLogin(this.state.email, this.state.password);
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.h1}>Log into myki</Text>
                <Text style={styles.label}>Username</Text>
                <TextInput 
                    style={styles.textbox}
                    onChangeText={this._updateEmail}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput 
                    style={styles.textbox} 
                    onChangeText={this._updatePassword}
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    textbox: {
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: '#DADADA',
        width: 306,
        height: 60,
        marginBottom: 32
    },
    label: {
        fontSize: 22,
        width: 306,
        marginBottom: 4
    },
    login: {
        backgroundColor: '#007AFF',
        width: 306,
        color: '#FFFFFF'
    },
    h1: {
        fontSize: 64,
        fontWeight: '800',
        width: 306,
        marginBottom: 32
    }
});
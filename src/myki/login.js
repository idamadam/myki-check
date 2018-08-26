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
                <Text>Username</Text>
                <TextInput 
                    style={styles.textbox}
                    onChangeText={this._updateEmail}
                />
                <Text>Password</Text>
                <TextInput 
                    style={styles.textbox} 
                    onChangeText={this._updatePassword}
                />
                <Button
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
        borderRadius: 4,
        borderColor: '#000000',
        width: 100,
        marginBottom: 10
    }
});
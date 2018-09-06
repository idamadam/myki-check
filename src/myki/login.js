import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert  } from 'react-native';
import { SecureStore } from 'expo';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    async componentDidMount() {
        let username = await SecureStore.getItemAsync('MYKI_USERNAME');
        let password = await SecureStore.getItemAsync('MYKI_PASSWORD');

        console.log(username, password)

        if (username != null && password != null) {
            this._login(username, password)
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
        email = this.state.email;
        password = this.state.password;

        if (email.length == 0 || password.length == 0) {
            Alert.alert('Please fill in form');
        } else {
            this.props.navigation.navigate('Balance', {
                username: email,
                password: password
            });
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.h1}>Login</Text>
                <Text style={styles.label}>Username</Text>
                <TextInput 
                    style={styles.textbox}
                    onChangeText={this._updateEmail}
                    placeholder={this.state.email}
                    autoCapitalize='none'
                    autoCorrect={false}

                />
                <Text style={styles.label}>Password</Text>
                <TextInput 
                    style={styles.textbox} 
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
    textbox: {
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: '#DADADA',
        width: 306,
        height: 60,
        marginBottom: 32,
        padding: 16,
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
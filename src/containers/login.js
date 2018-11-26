import React, { Component } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components'

import Input from '../components/textinput'
import Button from '../components/bigbutton'
import { H1, H2 } from '../components/typography'
import { BaseContainer } from '../components/baseContainer'

const Text = styled.Text`
    width: 306px;
    color: white;
`

const Form = styled.View`
    padding-top: 16px;
`

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
            <BaseContainer>
                <H1>Login</H1>
                <Text>You’ll need a myki account with a registered myki card.</Text>
                <Form>
                    <Input
                        label="myki Username"
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
                        onPress= {this._onPress}
                        title="Login" 
                    />
                </Form>
            </BaseContainer>
        );
    }

}
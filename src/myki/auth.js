import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert  } from 'react-native';
import { SecureStore } from 'expo';

const postData = (url = ``, data = {} ) => {
    return fetch(url, {
        method: "POST",
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    })
}

export default class Auth extends Component {
    constructor(props) {
        super(props);
    }

    _storeLogin = async (username, password) => {
        await SecureStore.setItemAsync('MYKI_USERNAME', username);
        await SecureStore.setItemAsync('MYKI_PASSWORD', password);
    }

    _isLoginStored = async () => {
        let username =  await SecureStore.getItemAsync('MYKI_USERNAME');
        let password =  await SecureStore.getItemAsync('MYKI_PASSWORD');

        console.log(username, password);
    }

    _getBalance = async (username, password) => {
        let auth = {
          username: username,
          password: password
        }  

        try {
            let query = await postData(`https://asia-northeast1-myki-api.cloudfunctions.net/fastBalance`, auth);

            if (query.error) {
                Vibration.vibrate();
                Alert.alert('Login failed', 'Your username or password was incorrect.', [{text: 'Try again', onPress: () => this.props.navigation.navigate('Login') }]);
            } else {
                this._storeLogin(auth.username, auth.password)
                this.setState({
                  isLoading: false,
                  balance:response.balance
                });
            }

        } catch(e) {
            console.error(error);
        }
    }

    render(){
        return(
            <View style={styles.loadingView}>
                <View style={styles.card}></View>
                <Text style={styles.h2}>👋 G'day</Text>
                <Text style={styles.h1}>Logging you in...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#C4C4C4',
      width: 304,
      height: 182,
      marginBottom: 10,
      borderRadius: 18
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 80
    },
    loadingView: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 180
    },
    navButtons: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
      padding: 30,
      marginBottom: 30
    },
    h1: {
      fontSize: 64,
      fontWeight: '900',
      width: 306,
      marginBottom: 8,
      paddingTop: 18
    },
    h2: {
      fontSize: 32,
      fontWeight: '500',
      width: 306,
    }
  });
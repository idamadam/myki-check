import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, AsyncStorage, Vibration} from 'react-native';
import { SecureStore } from 'expo';

import getBalance from '../api/getBalance'

export default class Auth extends Component {
    constructor(props) {
        super(props);
    }

    _storeLogin = async (username, password) => {
        await SecureStore.setItemAsync('MYKI_USERNAME', username);
        await SecureStore.setItemAsync('MYKI_PASSWORD', password);
    }

    _storeBalance = async(balance) => {
        await AsyncStorage.setItem('MYKI_BALANCE', balance);
    }

    _getBalance = async (username, password) => {
        try {
          let balance = await getBalance(username, password);
          this._storeBalance(balance);  
          this._storeLogin(username, password);
          this.props.navigation.navigate('Balance')
        } catch (error) {
          Vibration.vibrate();
          Alert.alert('Login failed', error.message, [{text: 'Try again', onPress: () => this.props.navigation.navigate('Login') }])
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
    
        let username = navigation.getParam('username');
        let password = navigation.getParam('password');
    
        this._getBalance(username, password);
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
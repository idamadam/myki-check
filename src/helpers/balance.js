import { Vibration, Alert } from 'react-native'
import { AsyncStorage } from 'react-native'

import { storeLogin } from './auth'
import apiBalance from '../api/getBalance'

export async function getBalance (username, password) {
    try {
      let balance = await apiBalance(username, password);
      await storeBalance(balance);  
      await storeLogin(username, password);
      return balance;
    } catch (error) {
      Vibration.vibrate();
      Alert.alert('Login failed', error, [{text: 'Try again', onPress: () => this.props.navigation.navigate('Login') }])
    }
}

export async function readBalance(navigation) {
    let storedBalance = await AsyncStorage.getItem('MYKI_BALANCE');
    if (storedBalance !== null ) {
      return storedBalance
    } else {
      navigation.navigate('Login')
    }
}

export async function storeBalance(balance) {
  await AsyncStorage.setItem('MYKI_BALANCE', balance);
}
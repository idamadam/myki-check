import { AsyncStorage } from 'react-native'
import moment from 'moment'

import { storeLogin } from './auth'
import apiData from '../api/getData'

export async function getData (username, password) {
  let data = await apiData(username, password);
  data.lastUpdated = moment().format()
  await storeData(data);  
  await storeLogin(username, password);
  return
}

export async function readData(navigation) {
    let storedData = await AsyncStorage.getItem('MYKI_DATA');
    if (storedData !== null ) {
      json = JSON.parse(storedData)
      return json
    } else {
      navigation.navigate('Login')
    }
}

export async function storeData(json) {
  let data = JSON.stringify(json);
  await AsyncStorage.setItem('MYKI_DATA', data);
}
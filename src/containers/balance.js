import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Vibration, Button, AsyncStorage } from 'react-native';
import { SecureStore } from 'expo';

import getBalance  from '../api/getBalance'

class cardBalance extends Component {

  constructor(props){
    super(props);

    this.state = {
      balance: "Loading.."
    }
  }

  _getBalance = async (username, password) => {
    try {
      let balance = await getBalance(username, password);
      this._storeLogin(username, password);
      this.setState({ balance: balance });
    } catch (error) {
      Vibration.vibrate();
      Alert.alert(error, 'Please try again', [{text: 'Try again', onPress: () => this.props.navigation.navigate('Login') }])
    }
  }

  _readBalance = async () => {
    let storedBalance = await AsyncStorage.getItem('MYKI_BALANCE');
    if (storedBalance !== null ) {
      return storedBalance
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  async _storeLogin(username, password) {
    await SecureStore.setItemAsync('MYKI_USERNAME', username);
    await SecureStore.setItemAsync('MYKI_PASSWORD', password);
  }

  async componentDidMount(){
    let balance =  await this._readBalance();
    let refreshParam = this.props.navigation.getParam('refresh');

    this.setState({
      balance: balance
    })

    if (refreshParam) {
      await this._refresh();
    }
  }
  
  _refresh = async () => {
    this.setState({
      balance: 'Loading..'
    })

    let username = await SecureStore.getItemAsync('MYKI_USERNAME');
    let password = await SecureStore.getItemAsync('MYKI_PASSWORD');

    this._getBalance(username, password);
  }

  _logout = async () => {
    await SecureStore.deleteItemAsync('MYKI_USERNAME');
    await SecureStore.deleteItemAsync('MYKI_PASSWORD');
    await AsyncStorage.removeItem('MYKI_BALANCE');
    this.props.navigation.navigate('Login');
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.navButtons}>
          <Button title="Refresh" onPress={this._refresh}/>
          <Button title="Log Out" onPress={this._logout} color="#C10000"/>
        </View>
        <View style={styles.card}></View>
        <Text style={styles.h2}>👋 G'day</Text>
        <Text style={styles.h1}>{this.state.balance}</Text>
        <Text style={styles.h2}>myki Money</Text>
      </View>
    );
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

export default cardBalance;
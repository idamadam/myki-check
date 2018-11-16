import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { SecureStore } from 'expo';

import { getBalance, readBalance } from '../helpers/balance'

class CardBalance extends Component {

  constructor(props){
    super(props);

    this.state = {
      balance: "Loading.."
    }
  }

  async componentDidMount(){
    let balance =  await readBalance();
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

    this.setState({
      balance: await getBalance(username, password)
    });
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
          <Button title="Refresh" onPress={this._refresh} color="#FFFFFF"/>
          <Button title="Log Out" onPress={this._logout} color="#C10000"/>
        </View>
        <View style={styles.card}></View>
        <Text style={styles.h2}>👋 Hi</Text>
        <Text style={styles.h1}>{this.state.balance}</Text>
        <Text style={styles.h3}>myki Money</Text>
        <Text style={styles.footer}>Updated 2 hours ago</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4B4C51',
    width: 304,
    height: 182,
    marginBottom: 10,
    borderRadius: 18
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#587F3D'
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
    paddingTop: 18,
    color: "#FFFFFF"
  },
  h2: {
    fontSize: 32,
    fontWeight: '500',
    width: 306,
    color: "#FFFFFF"
  },
  h3: {
    fontSize: 18,
    color: "#FFFFFF",
    opacity: 0.8,
    width: 306,
  },
  footer: {
    width: 306,
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.5,
    paddingTop: 64
  }
});

export default CardBalance;
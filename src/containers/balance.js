import React, { Component } from 'react';
import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import { SecureStore } from 'expo';

import { getData, readData } from '../actions/data'

import Card from '../components/card'
import Greeting from '../components/greeting'
import Balance from '../components/balance'
import Footer from '../components/footer'

class CardBalance extends Component {

  constructor(props){
    super(props);

    this.state = {
      balance: "Loading.."
    }
  }

  async componentDidMount(){
    let data =  await readData(this.props.navigation);
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

    await getData(username, password);
    data = await readData(this.props.navigation);
    this.setState({
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
        <Card />
        <Greeting />
        <Balance data={this.state.balance} caption="myki Money" />
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#587F3D'
  },
  navButtons: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    padding: 30,
    marginBottom: 30
  }
});

export default CardBalance;
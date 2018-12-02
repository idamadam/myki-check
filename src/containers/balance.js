import React, { Component } from 'react';
import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain'

import { getData, readData } from '../actions/data'

import Card from '../components/card'
import Greeting from '../components/greeting'
import CombinedBalance from '../components/combinedBalance'
import Footer from '../components/footer'
import { BaseContainer } from '../components/baseContainer'

class CardBalance extends Component {

  constructor(props){
    super(props);

    this.state = {
      accountHolder: null,
      cardNumber: null,
      money: "Loading..",
      lastUpdated: null,
      pass: null
    }
  }

  async componentDidMount(){
    let data =  await readData(this.props.navigation);
    let refreshParam = this.props.navigation.getParam('refresh');

    this.setState({
      accountHolder: data.accountHolder,
      cardNumber: data.cardNumber,
      money: data.money,
      pass: data.pass,
      lastUpdated: data.lastUpdated
    })

    if (refreshParam) {
      await this._refresh();
    }
  }
  
  _refresh = async () => {
    this.setState({
      money: 'Loading..',
      lastUpdated: null
    })

    let credentials = await Keychain.getGenericPassword();

    await getData(credentials.username, credentials.password);
    data = await readData(this.props.navigation);

    this.setState({
      accountHolder: data.accountHolder,
      cardNumber: data.cardNumber,
      money: data.money,
      pass: data.pass,
      lastUpdated: data.lastUpdated
    });
  }

  _logout = async () => {
    await Keychain.resetGenericPassword()
    await AsyncStorage.removeItem('MYKI_DATA');
    this.props.navigation.navigate('Login');
  }

  render(){
    return(
      <BaseContainer>
        <View style={styles.navButtons}>
          <Button title="Refresh" onPress={this._refresh} color="#FFFFFF"/>
          <Button title="Log Out" onPress={this._logout} color="#FFD601"/>
        </View>
        <Card accountHolder={this.state.accountHolder} cardNumber={this.state.cardNumber}/>
        <Greeting />
        <CombinedBalance money={this.state.money} pass={this.state.pass}/>
        <Footer lastUpdated={this.state.lastUpdated}/>
      </BaseContainer>
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
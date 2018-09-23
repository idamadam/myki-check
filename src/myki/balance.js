import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Vibration, Button } from 'react-native';
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

class cardBalance extends Component {

  constructor(props){
    super(props);
    this.state = { isLoading: true }
  }

  _getBalance = async (username, password) => {
    let auth = {
      username: username,
      password: password
    }
  
    postData(`https://9tulzhs3q4.execute-api.ap-southeast-2.amazonaws.com/dev/myki/balance`, auth)
    .then((response) => {
      if (response.error) {
        Vibration.vibrate();
        Alert.alert(response.error, 'Please try again', [{text: 'Try again', onPress: () => this.props.navigation.navigate('Login') }])
      } else {
        this._storeLogin(auth.username, auth.password)
        this.setState({
          isLoading: false,
          balance:response.balance
        });
      }
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  async _storeLogin(username, password) {
    await SecureStore.setItemAsync('MYKI_USERNAME', username);
    await SecureStore.setItemAsync('MYKI_PASSWORD', password);
  }

  componentDidMount(){
    const { navigation } = this.props;

    let username = navigation.getParam('username');
    let password = navigation.getParam('password');

    this._getBalance(username, password)
    
  }
  
  _refresh = async () => {
    this.setState({
      balance: 'Loading...'
    })

    let username = await SecureStore.getItemAsync('MYKI_USERNAME');
    let password = await SecureStore.getItemAsync('MYKI_PASSWORD');

    this._getBalance(username, password);
  }

  _logout = async () => {
    await SecureStore.deleteItemAsync('MYKI_USERNAME');
    await SecureStore.deleteItemAsync('MYKI_PASSWORD');
    this.props.navigation.navigate('Login');
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={styles.loadingView}>
          <View style={styles.card}></View>
          <Text style={styles.h1}>Loading Your Myki Balance</Text>
        </View>
      )
    }

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
    fontWeight: '800',
    width: 306,
    marginBottom: 8
  },
  h2: {
    fontSize: 32,
    fontWeight: '500',
    width: 306,
  }
});

export default cardBalance;
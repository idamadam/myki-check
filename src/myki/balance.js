import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Vibration, Button } from 'react-native';

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

  _getBalance = (username, password) => {
    let auth = {
      username: username,
      password: password
    }
  
    postData(`https://asia-northeast1-myki-api.cloudfunctions.net/getBalance`, auth)
    .then((response) => {
      if (response.error) {
        Vibration.vibrate();
        Alert.alert(response.error, 'Please try again', [{text: 'Try again', onPress: () => this.props.navigation.navigate('Login') }])
      } else {
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

  componentDidMount(){
    const { navigation } = this.props;

    let username = navigation.getParam('username');
    let password = navigation.getParam('password');

    this._getBalance(username, password)
    
  }
  
  _refresh = () => {
    this.setState({
      balance: 'Loading...'
    })

    let username = this.props.navigation.getParam('username');
    let password = this.props.navigation.getParam('password');

    this._getBalance(username, password);
  }

  _logout = () => {
    this.props.navigation.navigate('Login');
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={styles.contaniner}>
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
    paddingTop: 80,
    alignItems: 'center'
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
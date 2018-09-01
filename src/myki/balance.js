import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

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

  componentDidMount(){
    let auth = {
        'username': this.props.username,
        'password': this.props.password
    }

    postData(`https://asia-northeast1-myki-api.cloudfunctions.net/getBalance`, auth)
    .then((response) => {
      if (response.error) {
        Alert.alert(response.error, 'Please try again', [{text: 'Try again', onPress: () => this.props.loginFailed() }])
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
    justifyContent: 'center',
    alignItems: 'center'
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
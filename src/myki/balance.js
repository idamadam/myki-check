import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View  } from 'react-native';

const postData = (url = ``, data = {} ) => {
  return fetch(url, {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => {
    if (response.status == 403) {
      throw new Error('Incorrect login details')
    } else {
      return response.json()
    }
  })
  .catch((error) => {
    //Alert.alert(error);
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
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson
      }, function(){});
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 50, alignItems: 'center'}}>
          <View style={styles.card}></View>
          <Text style={{paddingTop: 10, fontSize: 30}}>Loading Your Myki Balance</Text>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:50, alignItems: 'center'}}>
        <Text style={{fontSize:30}}>
          Your balance is: {this.state.dataSource.balance}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#C4C4C4'
  }
});

export default cardBalance;
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native'

export default class Balance extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Text style={styles.footer}>Updated 2 hours ago</Text>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        width: 306,
        fontSize: 12,
        color: "#FFFFFF",
        opacity: 0.5,
        paddingTop: 64
      }  
})
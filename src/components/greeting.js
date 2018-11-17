import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native'

export default class Greeting extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Text style={styles.h2}>👋 Good morning</Text>
        );
    }
}

const styles = StyleSheet.create({
    h2: {
        fontSize: 32,
        fontWeight: '500',
        width: 306,
        color: "#FFFFFF"
    },
})
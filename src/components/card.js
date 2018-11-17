import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.card}>
                <Image source={require('../images/mykipattern.png')} style={styles.background}/>
                <View style={styles.metadata}>
                    <Text style={styles.cardName}>AHMED ADAM</Text>
                    <Text style={styles.cardNumber}>3084 2536 6601 365</Text>
                </View>
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
        borderRadius: 18,
        shadowColor: '#000000',
        shadowOpacity: 1.0,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10
    },
    background: {
        position: 'absolute',
        top: 10
    },
    metadata: {
        paddingTop: 120,
        paddingLeft: 18
    },
    cardName: {
        fontSize: 18,
        color: '#FFFCF6',
        fontWeight: '500',
    },
    cardNumber: {
        color: '#FFFCF6',
        opacity: 0.6,
        fontSize: 13
    }
})
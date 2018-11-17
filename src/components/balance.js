import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'

export default class Balance extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Text style={styles.h1}>{this.props.data}</Text>
                <Text style={styles.h3}>{this.props.caption}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 64,
        fontWeight: '900',
        width: 306,
        marginBottom: -2,
        paddingTop: 18,
        color: "#FFFFFF"
    },
    h3: {
        fontSize: 18,
        color: "#FFFFFF",
        opacity: 0.8,
        width: 306,
    },    
})
import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import Moment from 'react-moment';

export default class Balance extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                { this.props.lastUpdated
                    ? <Moment fromNow element={Text} style={styles.footer}>{this.props.lastUpdated}</Moment>
                    : <Text style={styles.footer}>Updating</Text>
               }
            </View>
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
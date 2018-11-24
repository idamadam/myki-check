import React, { Component } from 'react';
import { View } from 'react-native'
import styled from 'styled-components/native'

const H1 = styled.Text`
    font-size: 64;
    font-weight: 900;
    width: 306;
    margin-bottom: -2;
    padding-top: 18;
    color: white;
`

const H3 = styled.Text`
    font-size: 18;
    color: white;
    opacity: 0.8;
    width: 306;
`

export default class Balance extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <H1>{this.props.data}</H1>
                <H3>{this.props.caption}</H3>
            </View>
        );
    }
}
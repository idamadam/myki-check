import React, { Component } from 'react';
import styled from 'styled-components/native';

const CardBackground = styled.View`
    background-color: #4B4C51;
    width: 304;
    height: 182;
    margin-bottom: 10;
    border-radius: 18;
    shadow-color: #000000;
    shadow-opacity: 1.0;
    shadow-offset: 0px 5px;
    shadow-radius: 10px;
`
const MykiPattern = styled.Image`
    position: absolute;
    top: 10;
`
const Metadata = styled.View`
    padding-top: 120px;
    padding-left: 18px;
`
const Accountholder = styled.Text`
    font-size: 18px;
    color: #FFFCF6;
    font-weight: 500;
`
const CardNumber = styled.Text`
    color: #FFFCF6;
    opacity: 0.6;
    font-size: 13px;
`

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <CardBackground>
                <MykiPattern source={require('../images/mykipattern.png')} />
                <Metadata>
                    <Accountholder>{this.props.accountHolder ? this.props.accountHolder : ''}</Accountholder>
                    <CardNumber>{this.props.cardNumber ? this.props.cardNumber : ''}</CardNumber>
                </Metadata>
            </CardBackground>
        );
    }
}
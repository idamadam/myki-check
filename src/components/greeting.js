import React, { Component } from 'react';
import styled from 'styled-components/native'

const H2 = styled.Text`
    font-size: 32;
    font-weight: 500;
    width: 306;
    color: white;
`

export default class Greeting extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <H2>👋 Good morning</H2>
        );
    }
}
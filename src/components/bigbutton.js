import React, { Component } from 'react'
import styled from 'styled-components/native'

const TouchableHighlight = styled.TouchableHighlight`
    background: #C3D444;
    width: 306;
    height: 48;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    shadow-color: #000000;
    shadow-opacity: 0.25;
    shadow-offset: 0px 4px;
    shadow-radius: 4px;
    margin-top: 16px;
`
const ButtonText = styled.Text`
    color: #4B4C51;
    font-size: 18px;
    font-weight: 500;
`

export default class BigButton extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <TouchableHighlight {...this.props}>
                <ButtonText>{this.props.title}</ButtonText>
            </TouchableHighlight>
        )
    }
}
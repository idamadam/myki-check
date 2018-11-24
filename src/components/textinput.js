import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const Label = styled.Text`
    font-size: 22px;
    width: 306px;
    margin-bottom: 4px;
`

const Input = styled.TextInput`
    border-width: 0.5;
    border-radius: 6;
    border-color: #DADADA;
    width: 306px;
    height: 60px;
    margin-bottom: 32px;
    padding: 16px;
`

export default class TextInput extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View>
                <Label>{this.props.label}</Label>
                <Input {...this.props}></Input>
            </View>
        )
    }
}
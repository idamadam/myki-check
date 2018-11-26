import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import Balance from './balance'

export default class CombinedBalance extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        if (this.props.money && this.props.pass) {
            return (
                <View>
                    <Balance primary data={this.props.pass} caption='myki Pass'/>
                    <Balance data={this.props.money} caption='myki Money'/>
                </View>
            )
        }

        return <Balance primary data={this.props.money} caption='myki Money' />
    }
}
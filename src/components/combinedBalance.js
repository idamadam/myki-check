import React, { Component } from 'react'
import styled from 'styled-components/native'

import Balance from './balance'

export default class CombinedBalance extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <Balance data={this.props.money} caption="myki Money" />
        )
    }
}
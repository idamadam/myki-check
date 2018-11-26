import React, { Component } from 'react';
import { View } from 'react-native'

import { H1, H2, H3 } from './typography'

export default class Balance extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                {this.props.primary ?<H1>{this.props.data}</H1>:<H2>{this.props.data}</H2>}
                <H3>{this.props.caption}</H3>
            </View>
        );
    }
}
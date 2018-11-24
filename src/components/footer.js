import React, { Component } from 'react';
import styled from 'styled-components/native'
import moment from 'moment'

const Caption = styled.Text`
    width: 306;
    font-size: 12;
    color: white;
    opacity: 0.5;
    padding-top: 64;
`

export default class Balance extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let timeSinceUpdate = moment(this.props.lastUpdated).fromNow();
        return(
            <Caption>
                {this.props.lastUpdated ? `Updated ${timeSinceUpdate}` : `Updating` }
            </Caption>
        );
    }
}
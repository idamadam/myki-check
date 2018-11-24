import React, { Component } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

const H2 = styled.Text`
    font-size: 32;
    font-weight: 500;
    width: 306;
    color: white;
    padding-top: 16px;
`

export default class Greeting extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let currentHour = moment().hour()
        let timeOfDay = (currentHour <= 11 ) ? 'morning'
                        : (currentHour <= 16 ) ? 'afternoon'
                        : 'evening'
        
        let emojiOfDay = (timeOfDay == 'morning') ? '🌤'
                        : (timeOfDay == 'afternoon') ? '☀️'
                        : '🌙'        
        return(
            <H2>{emojiOfDay} Good {timeOfDay}</H2>
        );
    }
}
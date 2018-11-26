import React, { Component } from 'react';
import moment from 'moment';

import { H2 } from './typography'

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
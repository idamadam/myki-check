import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Auth from '../../src/containers/auth';
import Balance from '../../src/containers/balance';

storiesOf('Containers', module)
  .add('Auth', () => <Auth/>)
  .add('Balance',() =>  <Balance/>)
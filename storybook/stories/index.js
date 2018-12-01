import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Splash from '../../src/containers/splash';
import Login from '../../src/containers/login';
import Auth from '../../src/containers/auth';
import Balance from '../../src/containers/balance';

storiesOf('Containers', module)
  .add('Splash', () => <Splash />)
  .add('Login', () => <Login />)
  .add('Auth', () => <Auth/>)
  .add('Balance',() =>  <Balance/>)

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Meteor from 'react-native-meteor'  ;
import PokeVisionWrapper from './screens/NearMe';
import NearMe from './screens/NearMeTest';

// Meteor.connect('ws://localhost:5000/websocket');//do this only once
// Meteor.connect('ws://www.skyrocketdev.com/websocket');//do this only once

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="index" component={PokeVisionWrapper} title="PokéVision Wrapper!" initial={true} />
          <Scene key="nearMe" component={NearMe} title="PokéVision Development!"/>
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('main', () => App);

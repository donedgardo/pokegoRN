import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import nearMe from './screens/NearMe';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="nearMe" component={PageOne} title="Pokémon near you!" initial={true} />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('main', () => App);

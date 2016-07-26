import React, { Component } from 'react';
import { MapView, Dimensions, Image, View, StyleSheet, TouchableHighlight, Text, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Location } from 'exponent';


const styles = StyleSheet.create({
  mapContainer:{
    flex: 1,
    height: Dimensions.get('window').height - 160,
    marginTop: 80,
  },
  pokemonImg:{
    height: 48,
    width: 48,
  },
  loadingContainer:{
    display: 'absolute',
    top: 32,
    left: 0,
    height: 40,
    width: Dimensions.get('window').width,
    backgroundColor: 'blue',
  },
  loadingText:{
    alignText: 'center',
    color: 'white',
  },
  navigationComponent:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default class PokeVisionWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      pos: null,
      pokemons: [],
      mapLocation: '',
      loading: false,
    };
    this._getPokeVisionData = this._getPokeVisionData.bind(this);
  }
  componentWillMount(){
    const options = {enableHighAccuracy: true, timeInterval: 31000};
    Location.watchPositionAsync(options, this._getPokeVisionData);
  }
  _getPokeVisionData(pos){
    this.setState({pos: pos.coords});
    this.setState({loading: true});
    this.setState({mapLocation: `https://pokevision.com/#/@${pos.coords.latitude},${pos.coords.longitude}`});
  }
  render() {
    return (
      <View>
        <WebView
         source={{uri:this.state.mapLocation}}
         style={styles.mapContainer}
        />
        <TouchableHighlight sytle={styles.navigationComponent} onPress={Actions.nearMe}>
          <Text>Test Live Mode</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

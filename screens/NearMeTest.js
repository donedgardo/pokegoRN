import React, { Component } from 'react';
import { MapView, TouchableHighlight, Dimensions, Image, View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Location } from 'exponent';
import pokegoScan from 'pokego-scan';
import PokeBallLogo from '../assets/images/Pokeball.png';

import Meteor from 'react-native-meteor';
// Meteor.connect('ws://localhost:5000/websocket');//do this only once
Meteor.connect('ws://www.skyrocketdev.com/websocket');//do this only once

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    heigth: Dimensions.get('window').height - 80,
  },
  mapContainer:{
    flex: 1,
  },
  pokemonImg:{
    height: 48,
    width: 48,
  },
  refreshIcon:{
    height:40,
    width: 40,
  },
  loadingContainer:{
    height: 65,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText:{
    alignText: 'center',
    color: 'black',
  },
});
export default class PageOne extends Component {
  constructor(props){
    super(props);
    this.state = {
      pos: null,
      err: null,
      pokemons: [],
      loading: false,
      status: Meteor.status().connected,
    };
    this._getPokeVisionData = this._getPokeVisionData.bind(this);
    }
  componentDidMount(){
    const options = {enableHighAccuracy: true, timeInterval: 3500};
    Location.watchPositionAsync(options, this._getPokeVisionData);
  }
  componentWillUnmount(){
    Meteor.disconnect();
  }
  renderPokemon(pokemon){
    return (
      <View style={styles.container}>
        <Image
            source={{uri:pokemon.image}}
            style={styles.pokemonImg}
        />
        <Text>{pokemon.name}</Text>
        <Text>{pokemon.despawns_in_str}</Text>
      </View>
    );
  }
  _getPokeVisionData(pos){
    console.log('fetching...\n');
    this.setState({pos: pos.coords});
    this.setState({loading: true});
    Meteor.call('getPokeVisionData', pos.coords, (err, data)=>{
      if (err) {
        // TODO handle err
        console.log(err);
        this.setState({err: err.reason});
      }
      else {
        this.setState({err: null});
        let pokemonsParsed = data.map((pokemon)=>{
          return {
            id: pokemon.id.toString(),
            latitude: pokemon.latitude,
            longitude: pokemon.longitude,
            animatedDrop: true,
            draggable: false,
            title: pokemon.name,
            view: this.renderPokemon(pokemon),
          };
        });
        this.setState({pokemons:pokemonsParsed});
        this.setState({loading: false});
        console.log(pokemonsParsed.length);
      }
    });
  }

  render() {
    return (
      <View style={styles.mapContainer}>
        <MapView
            annotations={this.state.pokemons}
            showsUserLocation
            legalLabelInsets={{bottom: 0, left:0}}
            followUserLocation
            rotateEnabled={false}
            style={styles.mapView}
        />
        <View style={styles.loadingContainer} >
          { this.state.err ? <Text>{this.state.err}, Connected: {this.state.status ? 'true' : 'false'}</Text> : null}
          <Text>Reload</Text>
          <TouchableHighlight onPress={this._getPokeVisionData.bind(this)}>
            <Image
               style={styles.refreshIcon}
               source={PokeBallLogo}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage,
    Alert,
    Text,
  View
} from 'react-native';
import Router from 'react-native-simple-router';
import {HomeRoute} from './screens';
import {listen, sendMessage} from './utils/util';

function onStart() {
    listen(message => {
	Alert.alert("Message is", message)
    })
}

class Obol extends Component {

    constructor(){
	super();
	onStart();
    }
    	
    render() {
	return (
	    <Router
		firstRoute={HomeRoute}
		headerStyle={styles.header}
	    />
	);
    }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5cafec',
  },
});

AppRegistry.registerComponent('Obol', () => Obol);

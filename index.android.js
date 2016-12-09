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
    Text,
  View
} from 'react-native';
import Router from 'react-native-simple-router';
import {HomeRoute} from './screens';

class Obol extends Component {
    	
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

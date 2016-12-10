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
import store from './utils/store';
import { Provider } from 'react-redux';

function onStart() {
    listen(message => {
	try {
	    const data = JSON.parse(message);
	    store.dispatch({
		type: "UPDATE_WEIGHT",
		id: data.deviceID,
		weight: data.weight
	    });
//	    Alert.alert("Message is", "weight " + data.weight)
	}
	catch(e) {
//	    Alert.alert("Message is", "error "+JSON.stringify(e))
	}
//	Alert.alert("Message is", message)
    })
}

class Obol extends Component {

    constructor(){
	super();
	onStart();
    }
    	
    render() {
	return (
	    <Provider store={store}>
		<Router
		    backButtonComponent={() => (<Text style={{color: 'white', padding: 5, fontSize: 12}}>Back</Text>)}
		    firstRoute={HomeRoute}
		    headerStyle={styles.header}
	    />
	    </Provider>
	);
    }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'purple',
  },
});

AppRegistry.registerComponent('Obol', () => Obol);

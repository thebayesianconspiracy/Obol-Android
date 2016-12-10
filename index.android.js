/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage,
    DeviceEventEmitter,
    Alert,
    Text,
  View
} from 'react-native';
import Router from 'react-native-simple-router';
import {HomeRoute} from './screens';
import {listen, sendMessage} from './utils/util';
import store from './utils/store';
import { Provider } from 'react-redux';
import Notification from 'react-native-system-notification';
import PushNotification from 'react-native-push-notification';

import PushNotificationAndroid from 'react-native-push-notification'

(function() {
  // Register all the valid actions for notifications here and add the action handler for each action
  PushNotificationAndroid.registerNotificationActions(['Accept','Reject','Yes','No']);
  DeviceEventEmitter.addListener('notificationActionReceived', function(action){
    console.log ('Notification action received: ' + action);
    const info = JSON.parse(action.dataJSON);
    if (info.action == 'Accept') {
      // Do work pertaining to Accept action here
    } else if (info.action == 'Reject') {
      // Do work pertaining to Reject action here
    }
    // Add all the required actions handlers
  });
})();


function onStart() {
    PushNotification.configure({
	requestPermissions: true,
    });
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

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Navigator,
    ListView,
    View
} from 'react-native';
import {HomeRoute, DeviceRoute, SetupDeviceRoute} from './index.js';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import store from '../utils/store';
import {sendMessage} from '../utils/util';

function initNotification(message, title) {
    PushNotification.localNotification({
	/* Android Only Properties */
	id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
	ticker: message, // (optional)
	autoCancel: true, // (optional) default: true
	largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
	smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
	bigText: message, // (optional) default: "message" prop
	//	subText: "This is a subText", // (optional) default: none
	color: "red", // (optional) default: system default
	vibrate: true, // (optional) default: true
	vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
	tag: 'some_tag', // (optional) add tag to message
	group: "group", // (optional) add group to message
	ongoing: false, // (optional) set whether this is an "ongoing" notification

	/* iOS and Android properties */
	title: title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
	message: message, // (required)
	playSound: true, // (optional) default: true
	soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
	number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
	repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
	//	repeatTime: 30000,
	//	actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    });
}

export function triggerNotification() {
    const quant1 = store.getState().app.get('PI_1').get('quant');
    sendNotification("Time to take your medicine");
    setTimeout(() => {
	const quant2 = store.getState().app.get('PI_1').get('quant');
	if (quant2 == quant1 - 1) {
	    if (quant2 < 3) {
		sendNotification("Your medicines are running low.");
		sendMessage(JSON.stringify({appID: "APP_1", taken: 2}), 'obol/mail');
	    }
	    else {
		sendNotification("Good that you have taken your medicines");
		sendMessage(JSON.stringify({appID: "APP_1", taken: 1}), 'obol/mail');
	    }
	}
	else if (quant2 == quant1) {
	    sendMessage(JSON.stringify({appID: "APP_1", taken: 0}), 'obol/mail');
	    sendNotification("You Haven't taken your medicine");
	}
    }, 10000);
}

function sendNotification(message) {
    initNotification(message, "Reminder");
    setTimeout(() => {
	PushNotification.cancelAllLocalNotifications()
    }, 3000);
}


function nameMap(name) {
   return (name == "PI_1" )?"Device 1": "Device 2"
}

function RightButton(props) {
    return (<TouchableOpacity
		{...props}
		style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
	<Text style={{color: 'white', alignItems: 'flex-end'}}>Setup</Text>
    </TouchableOpacity>);
}

class Home extends Component {
    constructor() {
	super();
	this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    
    renderRow(rowItem) {
	const row = Object.assign({}, rowItem);
	const setupPress = () => {
	    this.props.toRoute(Object.assign({
		passProps: {row},
	    }, SetupDeviceRoute, {
		name: nameMap(row.name)
	    }));
	};

	const onPress = () => {
	    this.props.toRoute(Object.assign({
		passProps: {row},
		rightCorner: () => <RightButton onPress={setupPress}/>,
	    }, DeviceRoute, {
		name: nameMap(row.name)
	    }));
	};
	
	return (
	    <TouchableOpacity style={{padding: 10, borderBottomWidth: 1, margin: 5, borderColor: 'black'}} onPress={onPress}>
		<View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
		    <Text>
			{nameMap(rowItem.name)}
		    </Text>
		    <View style={{borderRadius: 15, width: 10, height: 10, backgroundColor: 'green'}}>
			
		    </View>
		</View>
		<View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
		    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
			{rowItem.quant} Units
		    </Text>
		</View>
		<View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
		    <Text>
			{rowItem.item}
		    </Text>
		    <Text>
			{(parseFloat(rowItem.weight)/rowItem.cal).toFixed(2)} gm
		    </Text>
		    <Text>
			{rowItem.category}
		    </Text>
		</View>
	    </TouchableOpacity>
	);
    }
    
    render() {
	const devices = this.props.devices.toJS();
	const rows = Object.keys(devices).map(function (key) { return devices[key]; });
	return (
	    <View style={styles.container}>
		<ListView
		    dataSource={this.ds.cloneWithRows(rows)}
		    renderRow={this.renderRow.bind(this)}
/>
		<TouchableOpacity onPress={triggerNotification} style={{position: 'absolute', height: 40, width: 200, padding: 10, backgroundColor: 'purple', borderRadius: 10, bottom: 5, left: 10}}>
		    <Text style={{color: 'white'}}>
			Start Demo
		    </Text>
		</TouchableOpacity>
	    </View>
	);
    }
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: 'white',
    },
});

mapStateToProps = function(state) {
    return {
	devices: state.app,
    }
}


export default connect(mapStateToProps)(Home);

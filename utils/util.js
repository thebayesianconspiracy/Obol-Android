import init from 'react_native_mqtt';
import {
    AsyncStorage,
    Alert,
} from 'react-native';

ct = 0;

var _queue = [];
var _connected = false;

function onConnect() {
//    Alert.alert("Done", "Working now " + ct++);
    client.subscribe("/obol/weight");
    _connected = true;
    for (ind in _queue) {
	var message = _queue[ind][0];
	var topic = _queue[ind][1];
	sendMessage(message, topic);
    }
}

function sendMessage(message, topic) {
    if (!_connected)
	return _queue.push([message, topic]);
    var message = new Paho.MQTT.Message(message);
    message.destinationName = topic;
    client.send(message);
}

function onConnectionLost(responseObject) {
//    Alert.alert("Done", "Not Working now " + ct++);
    if (responseObject.errorCode !== 0) {
	console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
//    	Alert.alert("Done", "Message is "+message.payloadString);
    //    console.log("onMessageArrived:"+message.payloadString);
    _connections.forEach(key => {
	if (key && key.constructor == Function) {
	    key(message.payloadString);
	}
    });
}

var _connections = [];

function listen(cb) {
    _connections.push(cb);
}

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync : {
    }
});
var client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'slkdfjwlekrjqwll');
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({
    onSuccess:onConnect,
});

export {
    listen,
    sendMessage,
};


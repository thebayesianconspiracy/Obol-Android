import Immutable from 'immutable';
import { combineReducers } from 'redux';
import {
    Alert,
} from 'react-native';

const initialState = Immutable.fromJS({
    "PI_1": {
	name:'PI_1',
	status: 'active',
	weight: "500",
	category: 'Food',
	item: 'apple',
	quant: "5",
	cal: 44,
	unitweight: "100",
	messages: [
	],
	notifications: [],
    },
    "PI_2": {
	name:'PI_2',
	status: 'active',
	weight: "500",
	category: 'Food',
	cal: 5.6,
	item: 'bread',
	quant: "5",
	unitweight: "100",
	messages: [
	],
	notifications: [],
    },
});

const calories = {
    "apple": 52,
    "banana": 89,
    "bread": 65,
}

function allEqual(arr) {
    if (arr.length < 4)
	return false;
    var item = average(arr);
    for (ind in arr) {
	if (arr[ind] < -2)
	    return false;
	if (Math.abs(arr[ind] - item) > 0.2*item && Math.abs(arr[ind] - item) > 8)
	    return false;
    }
    return true;
}

function average(arr) {
    return parseFloat(arr.reduce((a, b) => a+b))/parseFloat(arr.length);
}

function app(state = initialState, action = {}) {
       switch (action.type) {
       	   case "UPDATE":
	       state = state.mergeDeepIn([action.id], action.data)
	       const weight = parseFloat(state.getIn([action.id, 'weight']));
	       const quant = parseFloat(state.getIn([action.id, 'quant']));
	       const unitweight = ""+weight/quant;
	       state = state.mergeDeepIn([action.id], {unitweight});
	       return state;
	   case "UPDATE_WEIGHT":
	       var _messages = [];
	       state = state.updateIn([action.id, "messages"], messages => {
		   messages = messages.concat({weight: ""+action.weight}).slice(-5)
		   _messages = messages.toJS();
		   _messages = _messages.map(message => parseFloat(message.weight))
		   return messages;
	       }).updateIn([action.id], device => {
		   if (!allEqual(_messages))
		       return device;
		   const item = device.get('item');
		   const category = device.get('category');
		   const old_weight = device.get('weight');
		   const old_quant = device.get('quant');
		   const new_weight = average(_messages);
		   const newquant = parseInt(Math.round(new_weight/parseFloat(device.get('unitweight'))));
		   var notif = null;
		   if (category == 'Food') {
		       if (newquant < old_quant) {
			  var notif = ("You ate " + (old_quant - newquant) + " units of " + item + ". Calories consumed is: " + ((parseFloat(old_weight)-parseFloat(new_weight))*calories[item]/4400.0).toFixed(2));
		       }
		   }
		   if (notif){
		       device = device.updateIn(["notifications"], notifs => notifs.concat([notif]))
		   }
		   return device.updateIn(['weight'], weight => ""+new_weight).updateIn(['quant'], quant => ""+newquant);
	       })
	       /* if (!this.loaded)
		  Alert.alert("Done", JSON.stringify(state.toJS()));
		  this.loaded = true;*/
	       return state;
	   default:
	       return initialState;
       }
}

const appReducer = combineReducers({
    app
});

export default rootReducer = (state, action) => {
    return appReducer(state, action);
};

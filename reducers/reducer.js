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
	category: 'medicine',
	item: 'apple',
	quant: "5",
	unitweight: "100",
	messages: [
	],
    },
    "PI_2": {
	name:'PI_2',
	status: 'active',
	weight: "500",
	category: 'medicine',
	item: 'coconut',
	quant: "5",
	unitweight: "100",
	messages: [
	],
    },
});

function allEqual(arr) {
    if (arr.length < 4)
	return false;
    var item = average(arr);
    for (ind in arr) {
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
		   messages = messages.concat({weight: ""+action.weight}).slice(-10)
		   _messages = messages.toJS();
		   _messages = _messages.map(message => parseFloat(message.weight))
		   return messages;
	       }).updateIn([action.id], device => {
		   if (!allEqual(_messages))
		       return device;
		   const new_weight = average(_messages);
		   return device.updateIn(['weight'], weight => ""+new_weight).updateIn(['quant'], quant => ""+parseInt(new_weight/parseFloat(device.get('unitweight'))))
		   return device;
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

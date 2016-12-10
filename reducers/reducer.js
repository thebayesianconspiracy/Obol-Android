import Immutable from 'immutable';
import { combineReducers } from 'redux';
import {
    Alert,
} from 'react-native';

const initialState = Immutable.fromJS({
    "PI 1": {
	name:'PI 1',
	status: 'active',
	weight: "500",
	category: 'medicine',
	item: 'apple',
	quant: "5",
	messages: [
	    {content: "Hide yo kids"},
	    {content: "Woah"},
	],
    },
    "PI 2": {
	name:'PI 2',
	status: 'active',
	weight: "500",
	category: 'medicine',
	item: 'apple',
	quant: "5",
	messages: [
	    {content: "Hide yo kids"},
	    {content: "Woah"},
	],
    },
});

function app(state = initialState, action = {}) {
       switch (action.type) {
       	   case "UPDATE":
	       state = state.mergeDeepIn([action.id], action.data)
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

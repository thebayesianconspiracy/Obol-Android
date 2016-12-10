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
	messages: [
	    {weight: "Hide yo kids"},
	    {weight: "Woah"},
	],
    },
    "PI_2": {
	name:'PI_2',
	status: 'active',
	weight: "500",
	category: 'medicine',
	item: 'apple',
	quant: "5",
	messages: [
	    {weight: "Hide yo kids"},
	    {weight: "Woah"},
	],
    },
});

function app(state = initialState, action = {}) {
       switch (action.type) {
       	   case "UPDATE":
	       return state.mergeDeepIn([action.id], action.data)
	   case "UPDATE_WEIGHT":
	       state = state.updateIn([action.id, "messages"], messages => messages.concat({weight: ""+action.weight}))
	       if (!this.loaded)
		   Alert.alert("Done", JSON.stringify(state.toJS()));
	       this.loaded = true;
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

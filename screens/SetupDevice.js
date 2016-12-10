import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Picker,
    TextInput,
} from 'react-native';
import {sendMessage} from '../utils/util';

export default class SetupDevice extends Component {
    constructor(props) {
	super(props);
	const {row} = this.props;
	this.state = {
	    category: row.category || "Food",
	    item: row.item,
	    quant: row.quant,
	}
    }

    submit() {
	
    }
    
    render() {
	const {row} = this.props;
	return (
	    <View style={styles.container}>
		<Picker
		    selectedValue={this.state.category}
		    onValueChange={(category) => this.setState({category})}>
		    <Picker.Item label="Food" value="Food" />
		    <Picker.Item label="Medicine" value="Medicine" />
		</Picker>
		<TouchableOpacity style={{backgroundColor: 'blue'}} onPress={() => {
			sendMessage("set to zero", "/yoyo123");
		    }}>
		    <Text style={{margin: 10, borderRadius: 10, color: 'white'}}>
			Set to zero
		    </Text>
		</TouchableOpacity>
		<TextInput value={row.item} onChangeText={(item) => this.setState({item})} placeholder="What is it ?" />
		<TextInput value={row.quant} onChangeText={(quant) => this.setState({quant})} placeholder="How many are there ?" />
		<TouchableOpacity style={{backgroundColor: 'blue'}}>
		    <Text style={{margin: 10, borderRadius: 10, color: 'white'}}>
			Save
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

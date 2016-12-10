import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    View,
    Picker,
    TextInput,
} from 'react-native';
import {sendMessage} from '../utils/util';
import { connect } from 'react-redux';

class SetupDevice extends Component {
    constructor(props) {
	super(props);
	const {row} = this.props;
	this.state = {
	    category: row.category || "Food",
	    item: row.item,
	    quant: row.quant,
	}
    }

    save(row) {
	this.props.dispatch({
	    type: "UPDATE",
	    id: row["name"],
	    data: Object.assign(row, this.state),
	})
    }

    submit() {
	const {row} = this.props;
	this.save(row);
	this.props.toBack();
    }

    tare() {
	sendMessage(JSON.stringify({appID: "APP_1", deviceID: this.props.row.name}), "obol/tare");
	this.refs.item.setNativeProps({text: ''})
	this.refs.quant.setNativeProps({text: ''})
	this.setState({
	    item: "",
	    quant: "0",
	});
	var {row} = this.props;
	row.item = "";
	row.quant = "0";
	this.save(row);
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
		<TouchableOpacity style={{backgroundColor: 'blue'}} onPress={this.tare.bind(this)}>
		    <Text style={{margin: 10, borderRadius: 10, color: 'white'}}>
			Set to zero
		    </Text>
		</TouchableOpacity>
		<TextInput ref="item" defaultValue={row.item} onChangeText={(item) => this.setState({item})} placeholder="What is it ?" />
		<TextInput ref="quant" defaultValue={row.quant} onChangeText={(quant) => this.setState({quant})} placeholder="How many are there ?" />
		<TouchableOpacity onPress={this.submit.bind(this)} style={{backgroundColor: 'blue'}}>
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


mapStateToProps = function(state) {
    return {
	devices: state.app,
    }
}


export default connect(mapStateToProps)(SetupDevice);

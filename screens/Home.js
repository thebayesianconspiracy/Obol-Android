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

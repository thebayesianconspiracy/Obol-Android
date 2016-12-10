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
	    }, SetupDeviceRoute));
	};

	const onPress = () => {
	    this.props.toRoute(Object.assign({
		passProps: {row},
		rightCorner: () => <RightButton onPress={setupPress}/>,
	    }, DeviceRoute));
	};
	
	return (
	    <TouchableOpacity style={{padding: 10}} onPress={onPress}>
		<View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
		    <Text>
			{rowItem.name}
		    </Text>
		    <Text>
			{rowItem.status}
		    </Text>
		</View>
		<View style={{justifyContent: 'flex-start', flexDirection: 'row',}}>
		    <Text>
			{rowItem.weight}
		    </Text>
		</View>
		<View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
		    <Text>
			{rowItem.item}
		    </Text>
		    <Text>
			{rowItem.quant}
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

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
import {DeviceRoute, SetupDeviceRoute} from './index.js';

function RightButton(props) {
    return (<TouchableOpacity
		{...props}
		style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
	<Text style={{color: 'white', alignItems: 'flex-end'}}>Setup</Text>
    </TouchableOpacity>);
}

export default class Home extends Component {
    constructor() {
	super();
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state = {
	    dataSource: ds.cloneWithRows([
		{
		    name:'Device 1',
		    status: 'active',
		    weight: 500,
		    category: 'medicine',
		    item: 'apple',
		    quant: 5,
		    messages: [
			{content: "Hide yo kids"},
			{content: "Woah"},
		    ],
		},
		{
		    name: 'Device 2',
		    status: 'active',
		    weight: 600,
		    category: 'food',
		    item: 'coocount',
		    quant: 10,
		    messages: [
			{content: "Blah blah"},
			{content: "SOmething'sgoing on"},
		    ],
		}
	    ]),
	};
    }
    
    renderRow(row) {
	return (
	    <TouchableOpacity style={{padding: 10}} onPress={() => {
		    this.props.toRoute(Object.assign({
			passProps: {row},
			rightCorner: () => <RightButton onPress={() => {
				this.props.toRoute(Object.assign({
				    passProps: {row}
				}, SetupDeviceRoute));
			    }}/>,
		    }, DeviceRoute));
		}}>
		<View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
		    <Text>
			{row.name}
		    </Text>
		    <Text>
			{row.status}
		    </Text>
		</View>
		<View style={{justifyContent: 'flex-start', flexDirection: 'row',}}>
		    <Text>
			{row.weight}
		    </Text>
		</View>
		<View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
		    <Text>
			{row.item}
		    </Text>
		    <Text>
			{row.quant}
		    </Text>
		    <Text>
			{row.category}
		    </Text>
		</View>
	    </TouchableOpacity>
	);
    }
    
    render() {
	return (
	    <View style={styles.container}>
		<ListView
		    dataSource={this.state.dataSource}
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

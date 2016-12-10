import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';
import { connect } from 'react-redux';


function nameMap(name) {
    return (name == "PI_1" )?"Device 1": "Device 2"
}


class Device extends Component {
    constructor(props) {
	super(props);
    }

    renderRow(message) {
	return (
	    <View style={{borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
	    <Text>
	    {message}
	    </Text>
	</View>);
    }
    
    render() {
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	const row = this.props.devices.get(this.props.row.name)
	const rowItem = row.toJS();
	return (
	    <View style={styles.container}>
		<TouchableOpacity style={{padding: 10, borderBottomWidth: 1, margin: 5, borderColor: 'black'}} >
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
			    {rowItem.weight} gm
			</Text>
			<Text>
			    {rowItem.category}
			</Text>
		    </View>
		</TouchableOpacity>
		<ListView
		    dataSource={ds.cloneWithRows(row.get('notifications').toJS())}
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

export default connect(mapStateToProps)(Device);

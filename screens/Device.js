import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';
import { connect } from 'react-redux';

class Device extends Component {
    constructor(props) {
	super(props);
    }

    renderRow(message) {
	return (<Text>
	    {message.weight}
	</Text>);
    }
    
    render() {
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	const row = this.props.devices.get(this.props.row.name)
	return (
	    <View style={styles.container}>
		<Text>
		    {row.get('name')}
		</Text>
		<ListView
		    dataSource={ds.cloneWithRows(row.get('messages').toJS())}
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

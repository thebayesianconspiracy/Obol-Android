import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';

export default class Template extends Component {
    constructor(props) {
	super(props);
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state = {
	    dataSource: ds.cloneWithRows(this.props.row.messages),
	}
    }

    renderRow(message) {
	return (<Text>
	    {message.content}
	</Text>);
    }
    
    render() {
	const {row} = this.props;
	return (
	    <View style={styles.container}>
		<Text>
		    {row.name}
		</Text>
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

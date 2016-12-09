import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Template extends Component {
    constructor() {
	super();
    }
    render() {
	const {row} = this.props;
	return (
	    <View style={styles.container}>
		<Text>
		    {row.name}
		</Text>
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

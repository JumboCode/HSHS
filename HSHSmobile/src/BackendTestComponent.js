import React, { Component } from 'react'
import {
	Text,
  	View
} from 'react-native'


export default class BackendTestComponent extends Component {


	constructor(props) {
		super(props)


	}

	render() {
		console.log(this.props);
		return (
			<View style={styles.container}>
				<Text>
					Hello
				</Text>
			</View>

		)

	}
}

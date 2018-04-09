import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import {Icon} from "react-native-elements";
import renderSeperator from "./UI/renderSeperator";
import renderLoader from "./UI/renderLoader";
import dupNavFix from "../dupNavFix";

class Lottery_module extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{backgroundColor: 'green'}}>

			</View>
		);
	}


}


// TODO: do we need DupNavFix here?
export default Lottery_module;
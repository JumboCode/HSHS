import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import {Icon} from "react-native-elements";
import renderSeperator from "./UI/renderSeperator";
import renderLoader from "./UI/renderLoader";
import dupNavFix from "../dupNavFix";

// The time from start of day until lottery release
const lotteryReleaseTimeInMillis = 77400000;

class Lottery_module extends Component {
	constructor(props) {
		super(props);
	}

	_showCountdown() {
		let now = Date.now();
		let releaseDate = new Date();
		releaseDate.setHours(0);
		releaseDate.setMinutes(0);
		let releaseTimestamp = releaseDate.getTime() + lotteryReleaseTimeInMillis;

		return releaseTimestamp - now;
	}

	render() {
		return (
			<View style={{backgroundColor: 'green', flex: 1}}>
				<Text>Countdown until lottery:</Text>
				<Text>{this._showCountdown()}</Text>
			</View>
		);
	}


}


// TODO: do we need DupNavFix here?
export default Lottery_module;
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
    this.state = {timeRemaining: "", seconds: 0 };
	}

  componentWillMount() {
    let secs = this.calcTimeRemaining();
    this.setState({ seconds: secs });
  }

  componentDidMount() {
      this.interval = setInterval(() => {
        this.countDown();
        console.log(this.state.seconds);
      }, 1000);
  };

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  calcTimeRemaining = () => {
    let now = new Date();
		let releaseDate = new Date();
		releaseDate.setHours(0);
		releaseDate.setMinutes(0);
		let releaseTimestamp = releaseDate.getTime() + lotteryReleaseTimeInMillis;
    return ((releaseTimestamp - now) / 1000).toFixed(0);
  }

  countDown = () => {
      let secs = this.state.seconds - 1;
      let timeLeft = this.milisecondsToTime(secs);
      this.setState({timeRemaining: timeLeft, seconds: secs});
  }

	milisecondsToTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let hours = "0";
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes = minutes - (hours * 60);
      minutes = (minutes > 10) ? minutes : "0" + minutes;
    }
    seconds = seconds % 60;
		return (hours >= 10 ? hours : ("0" + hours)) + ":" + minutes + ":" + ((seconds >= 10) ? seconds : "0" + seconds) ;
	}

	render() {
		return (
			<View style={{backgroundColor: 'green', flex: 1}}>
				<Text>Countdown until lottery:</Text>
				<Text>{this.state.timeRemaining}</Text>
			</View>
		);
	}


}


// TODO: do we need DupNavFix here?
export default Lottery_module;

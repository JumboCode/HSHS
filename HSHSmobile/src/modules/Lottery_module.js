import React, {Component} from 'react';
import {
    StyleSheet,
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
    let secs = this.getTimeRemaining();
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

  getTimeRemaining = () => {
    let now = new Date();
		let releaseDate = new Date();
		releaseDate.setHours(0);
		releaseDate.setMinutes(0);
    releaseDate.setSeconds(0);
		let releaseTimestamp = releaseDate.getTime() + lotteryReleaseTimeInMillis;
    console.log("miliseconds " + (releaseTimestamp - now));
    let seconds = ((releaseTimestamp - now) / 1000).toFixed(0);
    console.log("seconds " + seconds);
    return seconds;
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
      <View style={styles.countDownBlock}>
        <View style={{margin: 30}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: "5%"}}>Status: Countdown till lottery</Text>
  				<Text style={{fontSize: 18, textAlign: "center", letterSpacing: 1.5}}>{this.state.timeRemaining}</Text>
        </View>
      </View>
		);
	}
}

const styles = StyleSheet.create( {

    countDownBlock: {
      marginTop: "20%",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }

});


// TODO: do we need DupNavFix here?
export default Lottery_module;

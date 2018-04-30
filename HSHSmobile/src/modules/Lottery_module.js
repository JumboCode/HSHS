import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Linking
} from 'react-native';
import {connect} from 'react-redux';
import renderSeperator from "./UI/renderSeperator";
import renderLoader from "./UI/renderLoader";
import dupNavFix from "../dupNavFix";
import {List, ListItem, Icon} from "react-native-elements";
import Prompt from 'rn-prompt';
import {getLotteryWinners} from '../redux/actions.js';

// Time from start of day until lottery release
const lotteryReleaseTimeInMillis = 77400000;
// Time before lottery release to begin countdown 
const timeBeforeCountdownInMillis = 3600000;

function mapStateToProps(state, ownProps) {
    return { lotteryWinner: state.lotteryWinner };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { getLotteryWinners: getLotteryWinners };
}
// Props:
// winners: string
// winnerEntered : true/false
class Lottery_module extends Component {
	constructor(props) {
		super(props);

    this.state = { timeRemaining: "", seconds: 0 };
	}

  // TODO: check database and see if data has been entered, set timeIndex
  componentWillMount() {
    let secs = this.getTimeRemaining();
    // secs = 3;
    this.setState ({ seconds: secs });
  }

  // Decrement counter every second
  componentDidMount() {
    this.props.getLotteryWinners();
    this.interval = setInterval(() => {
      this.countDown();
    }, 1000);
  };

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  // Called once when dashboard is rendered
  getTimeRemaining = () => {
    let now              = new Date();
		let releaseDate      = new Date();

		releaseDate.setHours(0);
		releaseDate.setMinutes(0);
    releaseDate.setSeconds(0);

    let releaseTimestamp = releaseDate.getTime() + lotteryReleaseTimeInMillis;

    let seconds          = ((releaseTimestamp - now) / 1000).toFixed(0);
    return 100000000;
    return seconds;
  }

  // TODO: Check if page transition works smoothly
  countDown = () => {
      let secs     = this.state.seconds - 1;
      let timeLeft;

      if (secs < 0) {
        timeLeft = this.millisecondsToTime(0);
        this.setState({timeRemaining: timeLeft, seconds: 0});        
        return;
      } 

      timeLeft = this.millisecondsToTime(secs);
      this.setState({timeRemaining: timeLeft, seconds: secs});
  }

	millisecondsToTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let hours   = "0";

    if (minutes > 59) {
      hours     = Math.floor(minutes / 60);
      minutes   = minutes - (hours * 60);
    }
    minutes   = (minutes > 10) ? minutes : "0" + minutes;
    seconds     = seconds % 60;

		return (hours >= 10 ? hours : ("0" + hours)) + ":" + minutes + ":" + ((seconds >= 10) ? seconds : "0" + seconds) ;
	}

  _renderLotteryWinners() {
    var winners = []
    if (this.props.lotteryWinner) {
      winners = this.props.lotteryWinner.split(" ");
    }

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.circle}><Text style={styles.text}>{winners[0] || '-'}</Text></View>
          <View style={styles.circle}><Text style={styles.text}>{winners[1] || '-'}</Text></View>
          <View style={styles.circle}><Text style={styles.text}>{winners[2] || '-'}</Text></View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.circle}><Text style={styles.text}>{winners[3] || '-'}</Text></View>
          <View style={styles.circle}><Text style={styles.text}>{winners[4] || '-'}</Text></View>
          <View style={styles.circle}><Text style={styles.text}>{winners[5] || '-'}</Text></View>
        </View>
      </View>
    )
  }

	render() {
    if (this.state.seconds < timeBeforeCountdownInMillis) {
      return (
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.block, {borderRightWidth: .5, borderColor: '#808080'}]}>
              <View style={{margin: 30, alignItems: 'center'}}>
                <Text style={styles.countdownText}>Lottery countdown</Text>
                <Text style={styles.countdownNumbers}>{this.state.timeRemaining}</Text>
                {this.state.seconds <= 0 ? 
                  (<Button
                      color="#rgba(119, 11, 22, 1)"
                      onPress={ () => {this.props.showDialogCallback()} }
                      title="Enter Winner" />) : null}
              </View>
            </View>

            <View style={styles.block}>
              <View style={{margin: 30, alignItems: 'center'}}>
                <Text style={styles.countdownText}>Today's lottery #s</Text>
                {this._renderLotteryWinners()}
              </View>
            </View>
          </View>

          {this.state.seconds <= 0 ? 
            (<TouchableOpacity
                style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20, marginBottom: 20}}
                onPress={ () => {Linking.openURL('tel:16175472841')} }>
                  <Icon name="phone"/>
                  <Text style={{marginLeft: 10}}>Tap here to call HSHS</Text>
             </TouchableOpacity>) : null}
          
        </View>
      );
    }
		
    // TODO Fix the styling to center this
    return (
        <View style={{height: '50%', flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
          <Text>
            Lottery will begin at 9 PM
          </Text>
        </View>
    );
	}
}
// <View>
//   { this.state.timeIndex === 0 ?
//     (<View style={styles.countDownBlock}>
//       <View style={{margin: 30}}>
//         <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: "5%"}}>Status: Countdown till lottery</Text>
// 				<Text style={{fontSize: 18, textAlign: "center", letterSpacing: 1.5}}>{this.state.timeRemaining}</Text>
//       </View>
//     </View>) :
//     <View>
//       { this.state.timeIndex === 1 &&
//         <View>
//           <View style={{flexDirection: "row", justifyContent: "center"}}>
//             <Text>Same</Text>
//           </View>
//         </View>
//       }
//     </View>
//   }
// </View>
const styles = StyleSheet.create( {
    block: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },

    circle: {
      height: 40,
      width: 40,
      borderRadius: 40/2,
      backgroundColor: '#C8C8C8',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 6,
      marginVertical: 3
    },

    lotteryBlock: {
      marginTop: "10%",
      flexDirection: 'column',
    },

    countdownText: {
      fontSize: 11, 
      marginBottom: "5%",
      color: '#404040'
    },

    countdownNumbers: {
      fontSize: 18,  
      letterSpacing: 1.5,
      color: '#383838'
    },

    text: {
      color: "#303030"
    }
});


// TODO: do we need DupNavFix here?
export default connect(mapStateToProps, mapDispatchToProps)(Lottery_module);

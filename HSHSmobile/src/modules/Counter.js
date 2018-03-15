// Defines a simple item counter
// Props: itemName - string
//        count - int
//        onValueChange - (val) => {}
// Example usage:
// <Counter
//   title="PB&J"
//   count=0
//   onValueChange={(val) => this.setState({PB&J: val}); }
//   />
// TODO: Figure out uniform sizing for counters. (ie text should wrap etc)
// TODO: change circle rendering @jacob?
import React, { Component } from 'react';
import {
        StyleSheet,
        FlatList,
        View,
        Text,
        Button,
        TouchableOpacity
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import Icon from 'react-native-vector-icons/Feather';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {count: this.props.count}
  }

  // Must be a member variable that is assigned a => function to ensure it's in
  // the same realm (not the right word) as this.state
  // Functions passed to TouchableOpacity below; they set local state
  // and call the onValueChange prop with updated value
  incrementCount = () => {
    let newVal = this.state.count + 1;
    this.setState({count: newVal});
    this.props.onValueChange(newVal);
  }

  // Lower bound of 0
  decrementCount = () => {
    let newVal = this.state.count - 1;
    if (newVal < 0) { newVal = 0; }
    this.setState({count: newVal});
    this.props.onValueChange(newVal);
  }

  render() {
		return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.incrementCount}>
            <Icon name="chevron-up" size={20} color="#900" />
        </TouchableOpacity>
        <View style={styles.circle}>
            <Text style={styles.text}>{this.state.count.toString()}</Text>
        </View>
        <TouchableOpacity onPress={this.decrementCount}>
            <Icon name="chevron-down" size={20} color="#900" />
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.itemName}</Text>
      </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems:'center',
      margin: 2
    },
    circle: {
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: 'gray',
      width: 45,
      height: 45,
      borderRadius: 45/2,
      borderWidth: 1.5,
    },
    text: {
      fontSize: 15,
    }
});

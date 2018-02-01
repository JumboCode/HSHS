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

const upArrowIcon = (<Icon name="chevron-thin-up" size={15} color="#900" />)
const downArrowIcon = (<Icon name="chevron-thin-down" size={15} color="#900" />)


// Props: item name, count
export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		return (
      <View style={{flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems:'center'}}>
        <TouchableOpacity
          onPress={() => {this.props.count++;}}
        >
          <Icon name="chevron-up" size={30} color="#900" />
        </TouchableOpacity>
        <View style={styles.circle}>
          <Text style={styles.text}>{this.props.count.toString()}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {if (this.props.count > 0) this.props.count--;}}
        >
          <Icon name="chevron-down" size={30} color="#900" />
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.itemName}</Text>
      </View>
		);
	}
}

const styles = StyleSheet.create({
    circle: {
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: 'gray',
      width: 50,
      height: 50,
      borderRadius: 50/2,
      borderWidth: 1.5,
    },
    text: {
      fontSize: 15,
    }
});

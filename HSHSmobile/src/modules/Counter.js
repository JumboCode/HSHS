import React, { Component } from 'react';
import {
	FlatList,
	View,
	Text,
  Button
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import { Icon } from 'react-native-elements'

// Props: item name, count
export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		return (
      <View style={{flex: 1, flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems:'center'}}>
        <Button
          onPress={() => {this.props.count++;}}
          title={"Up"}>
        </Button>
        <Text>{this.props.count.toString()}</Text>
        <Button
          title={"Down"}
          onPress={() => {if (this.props.count > 0) this.props.count--;}}>
        </Button>
        <Text>{this.props.itemName}</Text>
      </View>
		);
	}
}

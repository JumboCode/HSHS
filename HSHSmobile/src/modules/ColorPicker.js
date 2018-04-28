import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

// Props: color that indicates the current selected colors
//        onChange(color) which updates the selected color
// Example usage: <ColorPicker color = {this.state.color} onChange = {(newC) => {this.setState({color: newC});}} />
export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  renderColorButton = (c) =>
  (
      <TouchableOpacity
        onPress={() => {
              let stateColor = this.props.color == c ? null : c;
              this.props.onChange(stateColor);
          }
        }
        style={{flex: 1}}
      >
        <View style={this.props.color == c ? [styles.button, {backgroundColor: c}] : [styles.button, styles.disabled, {backgroundColor: c}]}>
        </View>
      </TouchableOpacity>
  )

  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', zIndex: 0, paddingLeft: 15, paddingRight: 15}}>
        {this.renderColorButton('#659B7F')}
        {this.renderColorButton('#818DC7')}
        {this.renderColorButton('#B65E68')}
        {this.renderColorButton('#D0AF55')}
        {this.renderColorButton('#C19FC7')}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: "lightblue",
      height: 25,
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    disabled: {
      opacity: 0.3
    }
});

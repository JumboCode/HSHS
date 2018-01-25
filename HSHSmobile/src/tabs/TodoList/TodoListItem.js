import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert,
    TextInput,
    //
  /*  AppRegistry,
    TouchableOpacity,*/
    //
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements'
import { addNewActionItem} from '../../redux/actions.js';
//import DatePicker from 'react-native-datepicker'
/*mport { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';*/

import Ionicons from 'react-native-vector-icons/Ionicons';


const Timestamp = require('react-timestamp');

function mapStateToProps(state, ownProps) {
    return {
        actionItem: state.actionItems[ownProps.id],
        item: null, //state.actionItems[ownProps.id],
        loading: state.loading,
    };
}

/*    return {
        item: null, //state.actionItems[ownProps.id],
        loading: state.loading,
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {
        addNewActionItem: addNewActionItem,
        //addNewGuest: addNewGuest
    };
}*/


class TodoListItem extends Component {
  constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      this.state = {
          selectedGuests: null,
          selectedLocation: null,
          title: this.props.actionItem.title
          //
          /*DateText: '',
          DateHolder: null,*/
      };
  };

  componentDidMount() {
      this.props.navigator.setButtons({
          rightButtons: [
              {
                  title: 'Save', // for a textual button, provide the button title (label)
                  id: 'save_actionItem', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                  disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                  disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                  showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                  buttonColor: 'white', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                  buttonFontSize: 18, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                  buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
              }
          ]
      });
  };

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
      if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
          if (event.id == 'save_actionItem') { // this is the same id field from the static navigatorButtons definition
              //this.props.addNewActionItem(true, "title", "creationTimestamp", "location", "description", "guestIds", "volunteerId");
              Alert.alert("Saving!");
          }
      }
  };

  renderSelectedGuestsText = (guests) => {
      return guests ? "TODO" : "Add Guest Profiles"
  };

  renderSelectedLocation = (location) => {
    return location ? "TODO" : "Add Location"
  };

  render() {
      return (
        <View style = {styles.container}>
            <View style = {styles.back}>
                <TextInput
                        editable = {true}
                        style = {styles.title}
                        placeholderTextColor = "#000000"
                        defaultValue = {this.state.title}
                        onChangeText={(title) => this.state.title = title}
                    />
                <View style = {styles.row}>
                    <Ionicons style = {styles.icon}
                        name="ios-person-outline"
                        size = {20} />
                    <Text style = {styles.add}>
                        Add Guest Profile
                    </Text>
                </View>
                <View style = {styles.row}>
                    <Ionicons style = {styles.icon}
                        name="ios-pin-outline"
                        size = {20} />
                    <Text style = {styles.add}>
                        Add Location
                    </Text>
                </View>
                <TextInput
                    editable = {true}
                    placeholder = "Description"
                    style = {styles.description}
                    multiline = {true}
                    />

            </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#E9E9E9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        backgroundColor: '#FFFFFF',
        alignSelf: "stretch",
    },
    title: {
        paddingTop: 30,
        paddingLeft: 20,
        color: "#000000",
        fontSize: 30,
        paddingBottom: 5
    },
    icon: {
        paddingRight: 10,
        paddingLeft: 7
    },
    row: {
        flexDirection: "row",
        paddingTop: 5,
        paddingLeft: 20
    },
    add: {
        color: '#0645AD',
        textDecorationLine: 'underline'
    },
    description: {
        borderWidth: 0.5,
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        height: 100,
        padding: 5,
        fontSize: 15,
        marginBottom: 30
    }
})

export default connect(mapStateToProps)(TodoListItem);

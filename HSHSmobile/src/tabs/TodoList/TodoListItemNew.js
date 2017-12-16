import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert,
    TextInput,
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements'


const Timestamp = require('react-timestamp');

function mapStateToProps(state, ownProps) {
    return {
        item: null, //state.actionItems[ownProps.id],
        loading: state.loading,
    };
}


class TodoListItemNew extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            selectedGuests: null,
            selectedLocation: null,
        };
    };

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Save', // for a textual button, provide the button title (label)
                id: 'save_actionItem', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
            }
        ]
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'save_actionItem') { // this is the same id field from the static navigatorButtons definition
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
            <View style={{flex: 1, flexDirection: 'column',}}>
                <TextInput
                    editable = {true}
                    placeholder = "Title"
                />
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Icon
                            name='person' />
                    </View>
                    <View>
                        <Text numberOfLines={1}>{this.renderSelectedGuestsText(this.state.selectedGuests)}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Icon
                            name='local-pizza' />
                    </View>
                    <View>
                        <Text numberOfLines={1}>{this.renderSelectedLocation(this.state.selectedLocation)}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(TodoListItemNew);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';

function mapStateToProps(state, ownProps) {
    return {
        actionItems: state.actionItems,
        guests: state.guests,
        loading: state.loading,
        interactions: state.interactions
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {
    };
}

class ActionItem_view extends Component {

  constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      this.state = {
      };
  };

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
      if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
          if (event.id == 'edit_actionItem') { // this is the same id field from the static navigatorButtons definition
              this.Screen_ActionItem_edit();
          }
      }
  };

  componentDidMount() {
      this.props.navigator.setButtons({
          rightButtons: [
              {
                  title: 'Edit', // for a textual button, provide the button title (label)
                  id: 'edit_actionItem', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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

  Screen_ActionItem_edit = () => {

    // TODO: geeze why is this longitude latitude and other places lat lng? cause google maps api sucks. please let's fix this later.
      var coords = this.props.actionItems[this.props.actionItemId].locationCoords ? {
        longitude: this.props.actionItems[this.props.actionItemId].locationCoords.lng,
        latitude: this.props.actionItems[this.props.actionItemId].locationCoords.lat,
      } : null;

      this.props.navigator.push({

          title: 'Edit Action Item',
          screen: 'ActionItem_edit', // unique ID registered with Navigation.registerScreen
          // TODO: consider to pass the id of this action item, edit screen will pull all the data there.
          passProps: {
            actionItemId: this.props.actionItemId,
            title: this.props.actionItems[this.props.actionItemId].title,

            actionItemId: this.props.actionItems[this.props.actionItemId].actionItemId,

            // make a copy
            taggedGuests: this.props.actionItems[this.props.actionItemId].guestIds ? this.props.actionItems[this.props.actionItemId].guestIds.slice() : null,

            locationCoords: coords,
            selectedLocation: this.props.actionItems[this.props.actionItemId].selectedLocation,
            locationName: this.props.actionItems[this.props.actionItemId].locationName,
            selectedDate: this.props.actionItems[this.props.actionItemId].selectedDate,
            dateName: this.props.actionItems[this.props.actionItemId].dateName,
            description: this.props.actionItems[this.props.actionItemId].description,
          }, // Object that will be passed as props to the pushed screen (optional)

          animated: true, // does the push have transition animation or does it happen immediately (optional)
          animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
          backButtonHidden: false, // hide the back button altogether (optional)
          navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
          navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
      })
  };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    {this.props.actionItemId}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionItem_view);

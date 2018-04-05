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
    View,
    TextInput, Dimensions, ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import dupNavFix from '../../dupNavFix';
import renderSeperator from "../../modules/UI/renderSeperator";
import MapView from 'react-native-maps';


function mapStateToProps(state, ownProps) {

    return {
        actionItems: ownProps.completed ? state.completedActionItems : state.actionItems,
        guests: state.guests,
        loading: state.loading,
        interactions: state.interactions
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
    };
}

class ActionItem_view extends Component {

  constructor(props) {
      super(props);
      this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      console.log(props);

      // TODO: geeze why is this longitude latitude and other places lat lng? cause google maps api sucks. please let's fix this later.
      var coords = this.props.actionItems[this.props.actionItemId].locationCoord ? {
          longitude: this.props.actionItems[this.props.actionItemId].locationCoord.lng,
          latitude: this.props.actionItems[this.props.actionItemId].locationCoord.lat,
      } : null;
      this.state = {
          title: this.props.actionItems[this.props.actionItemId].title,

          // make a copy
          taggedGuests: this.props.actionItems[this.props.actionItemId].guestIds ? this.props.actionItems[this.props.actionItemId].guestIds.slice() : null,

          locationCoord: coords,
          locationStr: this.props.actionItems[this.props.actionItemId].locationStr,
          selectedDate: this.props.actionItems[this.props.actionItemId].shiftDate,
          dateName: this.props.actionItems[this.props.actionItemId].dateName,
          description: this.props.actionItems[this.props.actionItemId].description,
          color: this.props.actionItems[this.props.actionItemId].color,
      };
  };

  onNavigatorEvent = (event) => { // this is the onPress handler for the two buttons together
      if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
          if (event.id == 'edit_actionItem') { // this is the same id field from the static navigatorButtons definition

                  this.props.navigateTo({

                      title: 'Edit Action Item',
                      screen: 'ActionItem_edit', // unique ID registered with Navigation.registerScreen
                      // TODO: consider to pass the id of this action item, edit screen will pull all the data there.
                      passProps: {
                        actionItemId: this.props.actionItemId,
                        title: this.state.title,

                        // make a copy
                        taggedGuests: this.state.taggedGuests,

                        locationCoord: this.state.locationCoord,
                        locationStr: this.state.locationStr,
                        selectedDate: this.state.selectedDate,
                        dateName: this.state.dateName,
                        description: this.state.description,
                        color: this.state.color,
                      },

                      animated: true, // does the push have transition animation or does it happen immediately (optional)
                      animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
                      backButtonHidden: false, // hide the back button altogether (optional)
                      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                  })
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
    formatGuestNames = (guestIds) => {
        if (!guestIds || guestIds.length == 0) {
            console.log("ERROR: formatGuestNames called despite no guestIds-- this should not happen");
            return ("No Tagged Guests");
        }
        var formatedString = "";
        for (let id of guestIds) {
            // Prevent app from crashing when an inavlid guest is included
            if (this.props.guests && this.props.guests[id])
                formatedString = formatedString + this.props.guests[id].name + ", ";
        }

        // get rid of that dumb last comma and space
        formatedString = formatedString.slice(0, -2);
        return formatedString
    };

    setMarkerRef = (ref) => {
        this.marker = ref
    }

    renderMarkers = () => {
        var markers = [];
        markers.push(
            <MapView.Marker
                coordinate={this.state.locationCoord}
                title={this.state.title}
                description={this.state.locationStr}
                key={0} // only 1
                pinColor={this.state.color}
                ref={this.setMarkerRef}
            />
        );
        return markers;
    };

    render() {
        return (
            <ScrollView style = {styles.container}>
                <View style = {styles.back}>
                    <TextInput
                        value = {this.state.title}
                        editable = {false}
                        placeholder = "Title"
                        style = {styles.title}
                        placeholderTextColor = '#d3d3d3'
                        onChangeText={(title) => {this.setState({'title': title});}}
                    />
                    {renderSeperator()}
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={this.state.taggedGuests ? this.state.taggedGuests.length : 0} style={{textAlign: 'right', margin: 10}}>{this.state.taggedGuests ? this.formatGuestNames(this.state.taggedGuests) : "No Tagged Guests"}</Text>
                        </View>
                    </View>
                    {renderSeperator()}
                    {(!this.state.locationCoord || (this.state.locationCoord.longitude == 0 && this.state.locationCoord.longitude == 0)) &&
                    <Text style={{margin: 10, textAlign: 'right'}}>No Selected Location</Text>
                    }
                    {(this.state.locationCoord && (this.state.locationCoord.longitude != 0 && this.state.locationCoord.longitude != 0)) &&
                    <MapView
                        showsUserLocation={true}

                        onRegionChangeComplete={() => this.marker.showCallout()}
                        region={{
                            latitude: this.state.locationCoord.latitude,
                            longitude: this.state.locationCoord.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01
                        }}
                        style={{
                            height: Dimensions.get('window').height * 0.4,
                            width: Dimensions.get('window').width,
                            margin: 0
                        }}
                    >
                        {
                        this.props.actionItems && this.renderMarkers()
                    }
                    </MapView>}
                    {renderSeperator()}
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}
                                  style={{textAlign: 'right', margin: 10}}>Due on: {this.state.selectedDate}</Text>

                        </View>
                    </View>
                    <TextInput
                        editable = {false}
                        placeholder = "No Description"
                        value = {this.state.description}
                        style = {styles.description}
                        multiline = {true}
                        onChangeText={(description) => {this.setState({description: description})}}
                    />
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#E9E9E9',
        flexDirection: 'column',
    },
    back: {
        backgroundColor: '#FFFFFF',
        alignSelf: "stretch",
    },
    title: {
        paddingTop: 20,
        paddingLeft: 20,
        color: "#000000",
        fontSize: 30,
        paddingBottom: 5
    },
    icon: {
        //paddingRight: 10,
        paddingLeft: 15
    },
    row: {
        flexDirection: "row",
        paddingTop: 5,
        paddingLeft: 20
    },
    daterow: {
        flexDirection: "row",
        paddingTop: 5,
        paddingLeft: 18
    },
    add: {
        paddingLeft: 2,
        color: '#0645AD',
        textDecorationLine: 'underline'
    },
    dateadd: {
        color: '#0645AD',
        textDecorationLine: 'underline'
    },
    deleteButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 4,
        margin: 10,
        paddingHorizontal: 60,
        paddingVertical: 15,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        borderWidth: 0.5,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        height: 100,
        padding: 5,
        fontSize: 15,
        marginBottom: 15,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(dupNavFix(ActionItem_view));

import React, { Component } from 'react';
import {
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
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements'
import ChooseLocation from '../Component/ChooseLocation';
import PopupDialog from 'react-native-popup-dialog';
import { Button } from 'react-native'

const Timestamp = require('react-timestamp');

function mapStateToProps(state, ownProps) {
    var guests = guestObjectToArray(state.guests, state.interactions);
    return {
        guests: guests,
        item: null, //state.actionItems[ownProps.id],
        loading: state.loading,
    };
}

function guestObjectToArray(IdsToGuests, IdsToInteractions) {
    var guestList = []
    for (var Id in IdsToGuests) {
        guestList.push({
            "Id" : Id,
            "name" : IdsToGuests[Id].name,
        });
    }
    console.log(guestList);
    return guestList;
}



// This component should be used every time guests need to be tagged.
// Props: ref gives a reference to the component for opening and closing
//        guests is the list of guests you get from redux
//        loading is the loading state from redux
//        taggedGuests is an array of guest names that have been selected
//        addGuest is a function that takes a name and adds that name to your
//          taggedGuests array
//        removeGuest is similar to addGuest
class TagGuestDialog extends Component {
    constructor(props) {
        super(props);

        // add guest names to the state for checklist
        this.state = {checked: [], results: [], search: false}

        // NOTE: One invariant is this.state.checked and this.props.taggedGuests
        // should always be the same. The information is duplicated because
        // the checks in checkboxes weren't re-rendering properly otherwise.
    };

    // calls show() fn of PopupDialog
    show(onShown: ?Function) {
      this.popupDialog.show();
    }


    renderLoading = () => {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 0,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderFooter = () => {
        return <Button
          title="Tag Guests"
          onPress={() => {
            this.popupDialog.dismiss();
          }}
        />;
    };

    render() {
      if (this.props.loading == true || this.props.guests.length <= 1) {
          return this.renderLoading();
      }
      return (
          <PopupDialog
              ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
                <FlatList
                    data = {this.props.guests}
                    renderItem={({ item }) => (
                        <CheckBox
                            title={`${item.name}`}
                            onPress={()=>
                                {
                                  if (!this.state.checked.includes(item.name)) {
                                    this.setState({checked: [...this.state.checked, item.name]});
                                    this.props.addGuest(item.name);
                                  } else {
                                    let index = this.state.checked.indexOf(item.name)
                                    let arr = this.state.checked
                                    arr.splice(index, 1)
                                    this.setState({checked: arr})
                                    this.props.removeGuest(item.name);
                                  }
                                }}
                            checked={this.state.checked.includes(item.name)}
                        ></CheckBox>
                    )}
                    keyExtractor = {item => item.Id}
                    ListHeaderComponent = {this.renderHeader}
                    ListFooterComponent = {this.renderFooter}
                    refreshing = {this.props.refreshing}
                    onEndReached = {this.handleLoadMore}
                    onEndReachedThreshold = {50}
                    extraData={this.state}
                />
              </List>
          </PopupDialog>
      );
    }
}

class TodoListItemNew extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.addGuest = this.addGuest.bind(this);
        this.removeGuest = this.removeGuest.bind(this);
        this.state = {
            taggedGuests: [],
            selectedLocation: null,
            locationName: "This is a location name"
        };
        setInterval(() => {console.log(this.state.taggedGuests);}, 2000);
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

    addGuest(guest) {
        this.setState({taggedGuests: [...this.state.taggedGuests, guest]});
    }

    removeGuest(guest) {
      let index = this.state.taggedGuests.indexOf(guest)
      let arr = this.state.taggedGuests
      arr.splice(index, 1)
      this.setState({taggedGuests: arr})
    }

    renderSelectedGuestsText = (guests) => {
        return guests ? "TODO" : "Add Guest Profiles"
    };

    renderSelectedLocation = (location) => {
      return location ? "TODO" : "Add Location"
    };

    setChosenLocation = (locationName) => {
        this.setState({locationName: locationName});
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
                <View>
                    <TouchableHighlight onPress={() => {
                        this.mapModule.openMap({lat: 42.405804, lng: -71.11956})
                    }}>
                        <Text>Lalala</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <Text>
                    {this.state.locationName}
                    </Text>
                </View>

                <View>
                    <TextInput
                        editable = {true}
                        placeholder = "Title"
                    />
                    <Button
                        title="Show Dialog"
                        onPress={() => {
                        this.tagGuestDialog.show();
                        }}
                    />
                    <TagGuestDialog
                        ref={(dialog) => { this.tagGuestDialog = dialog; }}
                        guests={this.props.guests}
                        loading={this.props.loading}
                        taggedGuests={this.state.taggedGuests}
                        addGuest={this.addGuest}
                        removeGuest={this.removeGuest}
                    />
                </View>

                <ChooseLocation
                    ref={(map) => {
                        this.mapModule = map;
                    }}
                    locationFunction={this.setChosenLocation.bind(this)}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(TodoListItemNew);

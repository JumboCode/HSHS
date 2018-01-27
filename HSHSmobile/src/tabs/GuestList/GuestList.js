import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import {connect} from 'react-redux';

const Icon = require('react-native-vector-icons/Ionicons');

function mapStateToProps(state, ownProps) {
    var guests = guestObjectToArray(state.guests, state.interactions);
    return {
        guests: guests,
        loading: state.loading,
        interactions: state.interactions,
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {
    };
}

//TODO sort by name
function guestObjectToArray(IdsToGuests, IdsToInteractions) {
    var guestList = []
    for (var Id in IdsToGuests) {
        guestList.push({
            "Id" : Id,
            "name" : IdsToGuests[Id].name,
            "lastInteractionString" : computeTimeStampString(IdsToGuests[Id].interactions, IdsToInteractions),
            "description": IdsToGuests[Id].description,
            "age" : IdsToGuests[Id].age,
            "gender": IdsToGuests[Id].gender
        });
    }

    guestList.sort((a, b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    return guestList;
}

function computeTimeStampString(interactionIds, IdsToInteractions) {
    if (interactionIds == null) {
        return "No interactions ";
    } else if (typeof(interactionIds) !== 'object') {
        // TODO : we shouldn't ever need this, but branches not synced have caused issues with types not matching
        return "ERROR: INTERACTIONS ARE IMPROPPER TYPE: " + typeof(interactionIds);
    }
    else {
        if (interactionIds[0] != null){
                var days = time_diff(IdsToInteractions[interactionIds[0]].timestamp);
            return "last interaction: " + days + ' days ago';
        } else {
            return "No interactions have timestamps";
        }
    }
}

time_diff = (utc_timestamp) => {
        var d1 = new Date(utc_timestamp),
                d2 = new Date();
        return diff = d2.getUTCDay() - d1.getUTCDay();
}

class GuestList extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.Screen_GuestListProfile = this.Screen_GuestListProfile.bind(this);
        this.props.loading = true;
    };

    static navigatorButtons = {
        rightButtons: [
          {
            title: 'Add', // for a textual button, provide the button title (label)
            id: 'add_guest', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
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
            if (event.id == 'add_guest') { // this is the same id field from the static navigatorButtons definition
                this.Screen_GuestListNew();
            }
        }
    };

    Screen_GuestListNew = () => {
        this.props.navigator.push({
            screen: 'GuestListNew', // unique ID registered with Navigation.registerScreen
            passProps: {}, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        })
    };

    Screen_GuestListProfile = (guest) => {
        this.props.navigator.push({
            screen: 'GuestListProfile', // unique ID registered with Navigation.registerScreen
            passProps: {
                Id: guest.Id,
                name: "Hey I left this variable so stuff dosn't break but please don't use it!"
            }, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        })
    };

    componentDidMount() {
        Icon.getImageSource('ios-person-add', 36).then((add) => {
            this.props.navigator.setButtons({
                rightButtons: [
                    { id: 'add_guest', icon: add },
                ]
            });
        });
    };

    componentWillUpdate(nextProps, nextState) {
        console.log(this.props.guests);
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
        return null;
        //return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

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

    render() {

        // TODO: this is a janky way of ensuring that the guest data has been computed, because when it hasn't the guests object has length 1. We should do this better.
        if (this.props.loading == true || this.props.guests.length <= 1) {
            return this.renderLoading();
        }
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
                <FlatList
                    data = {this.props.guests}
                    renderItem={({ item }) => (
                        <ListItem
                            title = {
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{width: 120, marginRight: 10}}>{item.name}</Text>
                                        <Text style={{marginRight: 10, width: 15}}>{item.gender}</Text>
                                        <Text>{item.age}</Text>
                                    </View>
                                    <Text style={{marginHorizontal: 'auto'}}>{item.lastInteractionString}</Text>
                                </View>
                            }
                            subtitle = {<Text numberOfLines={2} style={{marginTop: 5, marginLeft: 10, fontSize: 12, color: '#757575'}}>{item.description}</Text>}
                            subtitleStyle = {{marginTop: 5}}
                            containerStyle = {{ borderBottomWidth: 0 }}
                            onPress = {() => this.Screen_GuestListProfile(item)}
                        />
                    )}
                    keyExtractor = {item => item.Id}
                    ItemSeparatorComponent = {this.renderSeparator}
                    ListHeaderComponent = {this.renderHeader}
                    ListFooterComponent = {this.renderFooter}
                    refreshing = {this.props.refreshing}
                    onEndReached = {this.handleLoadMore}
                    onEndReachedThreshold = {50}
                />
            </List>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestList);

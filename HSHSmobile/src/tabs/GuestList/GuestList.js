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
import renderSeperator from "../../modules/UI/renderSeperator";
import renderLoader from "../../modules/UI/renderLoader";
import dupNavFix from "../../dupNavFix";

const Icon = require('react-native-vector-icons/Ionicons');

function mapStateToProps(state, ownProps) {
    var guests = guestObjectToArray(state.guests, state.interactions);
    return {
        guests: guests,
        loading: state.loading,
        interactions: state.interactions,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
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
            "gender": IdsToGuests[Id].gender,
            "color": getRandomColor(),
            "actionItems": IdsToGuests[Id].actionItems
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
        this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.Screen_GuestListProfile = this.Screen_GuestListProfile.bind(this);
        this.props.loading = true;
        this.state = {searchInput: ''};
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
        this.props.navigateTo({
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
        this.props.navigateTo({
            screen: 'GuestListProfile', // unique ID registered with Navigation.registerScreen
            passProps: {
                Id: guest.Id,
                //name: "Hey I left this variable so stuff dosn't break but please don't use it!",
                actionItems: "hello"
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
        // console.log(this.props.guests);
    };

    renderHeader = () => {
        return ;
    };

    renderListItem = (item) => {
        return(
            <View style={{backgroundColor: item.color}}>
                <ListItem
                    title = {
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5}}>
                          <Text style={{marginRight: 10, fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                        </View>
                    }
                    subtitle = {
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <View style={{flex: 1, alignSelf: 'flex-start'}}>
                          <Text numberOfLines={2} style={{marginTop: 5, marginLeft: 5, fontSize: 12, color: '#757575', height: 30}}>{item.description}</Text>
                        </View>
                        <View style={{flex: 0.4, flexDirection: 'column', alignSelf: 'flex-end', height: 30}}>
                          <Text style={{fontSize: 12, color: '#1560BD', fontWeight: 'bold'}}>{item.gender} - {item.age}</Text>
                          <Text numberOfLines={1} style={{fontSize: 12, color: '#1560BD', fontStyle: 'italic'}}>{item.lastInteractionString}</Text>
                        </View>
                      </View>
                    }
                    containerStyle = {{ borderBottomWidth: 0, marginLeft: 10, backgroundColor:"#F5FCFF" }}
                    onPress = {() => this.Screen_GuestListProfile(item)}
                />
            </View>
        );
    };

    render() {
        if (this.props.loading == true) {
            return renderLoader();
        }
        if (this.props.guests.length < 1) {
          return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center', fontStyle: 'italic'}}>
                {'No guests in database.'}
                </Text>
            </View>

            )
        }
        return (

            <View style={{height: '100%'}}>
                <SearchBar
                    placeholder="Search"
                    containerStyle={{backgroundColor: 'transparent'}}
                    onChangeText={(str) => {this.setState({searchInput: str.toLowerCase()})}}
                    onClearText={() => this.setState({searchInput: ''})}
                    lightTheme
                    clearIcon={this.state.searchInput !== ''}
                    round
                />
                <FlatList
                    data = {this.props.guests.filter(item => item.name.toLowerCase().includes(this.state.searchInput) || item.description.toLowerCase().includes(this.state.searchInput))}
                    renderItem={({item}) => this.renderListItem(item)}
                    keyExtractor = {item => item.Id}
                    ItemSeparatorComponent = {() => {return(renderSeperator())}}
                    refreshing = {this.props.refreshing}
                    onEndReached = {this.handleLoadMore}
                    onEndReachedThreshold = {50}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default connect(mapStateToProps, mapDispatchToProps)(dupNavFix(GuestList));

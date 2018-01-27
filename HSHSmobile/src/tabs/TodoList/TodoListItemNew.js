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
import { Icon, List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import {connect} from 'react-redux';
import ChooseLocation from '../../modules/ChooseLocation';
import TagGuestDialog from "../../modules/TagGuestDialog"
import renderSeperator from '../../modules/UI/renderSeperator'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addNewActionItem, getActionItems} from "../../redux/actions";

function mapStateToProps(state, ownProps) {
    var guests = guestObjectToArray(state.guests, state.interactions);
    return {
        guests: guests,
        item: null, //state.actionItems[ownProps.id],
        loading: state.loading,
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {
        addNewActionItem: addNewActionItem,
        getActionItems: getActionItems
    };
}

function guestObjectToArray(IdsToGuests, IdsToInteractions) {
    var guestList = [];
    for (var Id in IdsToGuests) {
        guestList.push({
            "Id" : Id,
            "name" : IdsToGuests[Id].name,
        });
    }
    console.log(guestList);
    return guestList;
}

class TodoListItemNew extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.addGuest = this.addGuest.bind(this);
        this.removeGuest = this.removeGuest.bind(this);
        this.state = {
            title: "",
            taggedGuests: [],
            locationCoords: {
            	longitude: 0,
            	latitude: 0
            },
            locationName: "No Location Selected",
            selectedDate: "",
            dateName: "No Date Selected",
            description: "",
        };
        setInterval(() => {
            console.log(this.state.taggedGuests);
        }, 2000); //TODO: DELETE DEBUG CODE
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
                addNewActionItem(false, this.state.title, "creationTimestamp", this.state.locationCoords, this.state.locationName, "shiftDate", this.state.description, [0], "volunteerId");
                getActionItems();
                this.props.navigator.pop({
                    animated: true, // does the pop have transition animation or does it happen immediately (optional)
                    animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                });
            }
        }
    };

    addGuest(guest) {
        this.setState({taggedGuests: [...this.state.taggedGuests, guest]});
    }

    removeGuest(guest) {
        let index = this.state.taggedGuests.indexOf(guest);
        let arr = this.state.taggedGuests;
        arr.splice(index, 1);
        this.setState({taggedGuests: arr})
    }

    setChosenLocation = (locationName, locationCoords) => {
        this.setState({
            locationName: locationName,
            locationCoords: locationCoords,
        });
    };

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.back}>
                    <TextInput
                        editable = {true}
                        placeholder = "Title"
                        style = {styles.title}
                        placeholderTextColor = "#000000"
                        onChangeText={(title) => this.state.title = title}
                    />
                    {renderSeperator()}
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View>
                            <Icon
                                raised
                                color='#770B16'
                                name='person'
                                size={16}
                                onPress={() => {
                                    this.tagGuestDialog.show();
                                }}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1} style={{textAlign: 'right', margin: 10}}>{"X Guests Selected"}</Text>
                        </View>
                    </View>
                    {renderSeperator()}
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View>
                            <Icon
                                raised
                                color='#770B16'
                                name='location-on'
                                size={16}
                                onPress={() => {
                                    this.mapModule.openMap({lat: 42.405804, lng: -71.11956})
                                }}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}
                                  style={{textAlign: 'right', margin: 10}}>{this.state.locationName}</Text>

                        </View>
                    </View>
                    {renderSeperator()}
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View>
                            <Icon
                                raised
                                color='#770B16'
                                name='timer'
                                size={16}
                                onPress={() => {
                                    alert("Make this connect to the calendar picker!")
                                }}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}
                                  style={{textAlign: 'right', margin: 10}}>{this.state.dateName}</Text>

                        </View>
                    </View>
                    {renderSeperator()}
                    <TextInput
                        editable = {true}
                        placeholder = "Description"
                        style = {styles.description}
                        multiline = {true}
                        onChangeText={(description) => this.state.description = description}
                    />
                </View>
                <TagGuestDialog
                    ref={(dialog) => {
                        this.tagGuestDialog = dialog;
                    }}
                    guests={this.props.guests}
                    loading={this.props.loading}
                    taggedGuests={this.state.taggedGuests}
                    addGuest={this.addGuest}
                    removeGuest={this.removeGuest}
                />
                <ChooseLocation
                    ref={(map) => {
                        this.mapModule = map;
                    }}
                    viewHeight={this.state.viewHeight}
                    viewWidth={this.state.viewWidth}
                    locationFunction={this.setChosenLocation.bind(this)}
                />
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
    description: {
        borderWidth: 0.5,
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        height: 100,
        padding: 5,
        fontSize: 15,
        marginBottom: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItemNew);

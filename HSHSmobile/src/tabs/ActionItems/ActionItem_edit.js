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
import ChooseLocationPopup from '../../modules/popups/ChooseLocationPopup';

import TagGuestPopup from "../../modules/popups/TagGuestPopup"
import renderSeperator from '../../modules/UI/renderSeperator'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addNewActionItem, getActionItems, editActionItem} from "../../redux/actions";
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';

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
        editActionItem: editActionItem,
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
    return guestList;
}

class ActionItem_edit extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state = {
            actionItemId: this.props.actionItemId ? this.props.actionItemId : null,
            title: this.props.title ? this.props.title : '',
            taggedGuests: this.props.taggedGuests ? this.props.taggedGuests : [],

            // TODO: geeze why is this longitude latitude and other places lat lng? cause google maps api sucks. please let's fix this later.
            locationCoord: this.props.locationCoord ? this.props.locationCoord : {
            	longitude: 0,
            	latitude: 0,
            },
            locationStr: this.props.locationStr ? this.props.locationStr : null,
            selectedDate: this.props.selectedDate ? this.props.selectedDate : Moment().format('YYYY-MM-DD'),
            description: this.props.description ? this.props.description : "",
            color: this.props.color ? this.props.color : null,
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
                    showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar.
                    buttonFontSize: 18, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                    buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                }
            ]
        });
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'save_actionItem') { // this is the same id field from the static navigatorButtons definition

            	// Don't allow empty fields
            	if (this.state.title == "") {
            		alert("Title cannot be empty");
            		return;
            	}

              // It's new if there is no ID
              if (!this.state.actionItemId) {
                addNewActionItem(false, this.state.title, "creationTimestamp", this.state.locationCoord, this.state.locationStr, this.state.selectedDate, this.state.description, this.state.taggedGuests, "volunteerId", this.state.color);
              } else {
                editActionItem(this.state.actionItemId, false, this.state.title, "creationTimestamp", this.state.locationCoord, this.state.locationStr, this.state.selectedDate, this.state.description, this.state.taggedGuests, "volunteerId", this.state.color);
              }

              getActionItems();
              this.props.navigator.pop({
                  animated: true, // does the pop have transition animation or does it happen immediately (optional)
                  animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                });
            }
        }
    };

    setSelectedGuests = (guests) => {
      this.setState({
        taggedGuests: guests
      });
    }

    setChosenLocation = (locationStr, locationCoord) => {
        this.setState({
            locationStr: locationStr,
            locationCoord: locationCoord,
        });
    };

    renderColorButton = (c) =>
    (
        <TouchableOpacity
          onPress={() => {
                let stateColor = this.state.color == c ? null : c;
                this.setState({color: stateColor });
            }
          }
          style={{flex: 1}}
          >
          <View style={this.state.color == c ? [styles.button, {backgroundColor: c}] : [styles.button, styles.disabled, {backgroundColor: c}]}>
          </View>
        </TouchableOpacity>
    )

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.back}>
                    <TextInput
                        value = {this.state.title}
                        editable = {true}
                        placeholder = "Title"
                        style = {styles.title}
                        placeholderTextColor = '#d3d3d3'
                        onChangeText={(title) => {this.setState({'title': title});}}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View style = {styles.icon}>
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
                            <Text numberOfLines={1} style={{textAlign: 'right', margin: 10}}>{this.state.taggedGuests.length +  " Tagged Guests"}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View style = {styles.icon}>
                            <Icon
                                raised
                                color='#770B16'
                                name='location-on'
                                size={16}
                                onPress={() => {
                                    this.ChooseLocationPopup.show()
                                }}/>
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}
                                  style={{textAlign: 'right', margin: 10}}>{this.state.locationStr ? this.state.locationStr : "No Tagged Location"}</Text>

                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        <View style = {styles.icon}>

                                <DatePicker
                                    date={this.state.selectedDate}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    hideText
                                    iconComponent={<Icon
                                        raised
                                        color='#770B16'
                                        name='timer'
                                        size={16}
                                        />}
                                    customStyles={{
                                      dateTouchBody: {
                                        width: 50
                                      }
                                    }}
                                    onDateChange={(date) => {this.setState({selectedDate: date})}}
                                  />
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}
                                  style={{textAlign: 'right', margin: 10}}>Due on: {this.state.selectedDate}</Text>

                        </View>
                    </View>
                    <TextInput
                        editable = {true}
                        placeholder = "Description"
                        value = {this.state.description}
                        style = {styles.description}
                        multiline = {true}
                        onChangeText={(description) => {this.setState({description: description})}}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', zIndex: 0, paddingLeft: 15, paddingRight: 15}}>
                      {this.renderColorButton('#659B7F')}
                      {this.renderColorButton('#818DC7')}
                      {this.renderColorButton('#B65E68')}
                      {this.renderColorButton('#D0AF55')}
                      {this.renderColorButton('#C19FC7')}
                    </View>
                </View>
                <TagGuestPopup
                    ref={(dialog) => {
                        this.tagGuestDialog = dialog;
                    }}
                    initialGuests={this.state.taggedGuests}
                    guests={this.props.guests}
                    loading={this.props.loading}
                    onConfirm={this.setSelectedGuests}
                />
                <ChooseLocationPopup
                  ref={(map) => {
                      this.ChooseLocationPopup = map;
                  }}
                  onConfirm={this.setChosenLocation}
                  locationStr={this.props.locationStr}
                  locationCoord={this.props.locationCoord}
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

export default connect(mapStateToProps, mapDispatchToProps)(ActionItem_edit );

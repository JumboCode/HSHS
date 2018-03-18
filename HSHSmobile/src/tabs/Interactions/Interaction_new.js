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
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Icon, List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import {connect} from 'react-redux';
import ChooseLocationPopup from '../../modules/popups/ChooseLocationPopup';

import TagGuestPopup from "../../modules/popups/TagGuestPopup"
import renderSeperator from '../../modules/UI/renderSeperator'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addInteractionItem, getActionItems} from "../../redux/actions";
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import Counter from '../../modules/Counter'

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
        addInteractionItem: addInteractionItem,
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
        this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));

        this.state = {
            title: '',
            taggedGuests: [],
            locationCoord: this.props.locationCoord ? this.props.locationCoord : {
            	longitude: 0,
            	latitude: 0,
            },
            locationStr: this.props.locationStr ? this.props.locationStr : null,
            date: Moment().format('YYYY-MM-DD'),
            interactionTimeStamp: Moment().format('YYYY-MM-DD'),
            description: "",
            items: {}
        };
    };

    componentDidMount() {
        this.props.navigator.setButtons({
            rightButtons: [
                {
                    title: 'Save', // for a textual button, provide the button title (label)
                    id: 'save_interaction', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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
            if (event.id == 'save_interaction') { // this is the same id field from the static navigatorButtons definition
            	// Don't allow empty fields
            	if (this.state.title == "") {
            		alert("Title cannot be empty");
            		return;
            	}
              this._save();;
            }
        }
    };

    _save = () => {
        addInteractionItem(this.state.title, this.state.interactionTimeStamp,
          this.state.date, this.state.locationCoord,
          this.state.locationStr, this.state.description, this.state.taggedGuests,
          "[Volunteer ID: See Interaction_new.js]", this.state.items);
    }

    _setTaggedGuests = (guests) => {
      this.setState({
        taggedGuests: guests
      });
    }

    _setChosenLocation = (locationStr, locationCoord) => {
        this.setState({
            locationStr: locationStr,
            locationCoord: locationCoord,
        });
    };

    _renderCounter = (_itemName) => {
      var self = this;
      return (
        <View style={{flex: 1}}>
          <Counter
            itemName={_itemName}
            count={0}
            onValueChange= {(val) => {self._setItem(_itemName, val)}}
            />
        </View>
      )
    };

    _setItem = (itemName, count) => {
      let items = this.state.items;
      items[itemName] = count;
      this.setState({items: items});
      console.log(this.state.items);
    }

    render() {
        return (
            <View style = {styles.container}>
            <ScrollView style={{width: "100%"}}>
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
                                    date={this.state.date}
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
                                    onDateChange={(date) => {this.setState({date: date})}}
                                  />
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1}
                                  style={{textAlign: 'right', margin: 10}}>Date: {this.state.date}</Text>

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
                    {renderSeperator()}
                      <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        {this._renderCounter("Item 1")}
                        {this._renderCounter("Item 2")}
                        {this._renderCounter("Item 3")}
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        {this._renderCounter("Item 4")}
                        {this._renderCounter("Item 5")}
                        {this._renderCounter("Item 6")}
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                        {this._renderCounter("Item 7")}
                        {this._renderCounter("Item 8")}
                        {this._renderCounter("Item 9")}
                      </View>
                </View>
                </ScrollView>
                <ChooseLocationPopup
                  ref={(map) => {
                      this.ChooseLocationPopup = map;
                  }}
                  onConfirm={this._setChosenLocation}
                  locationStr={this.props.locationStr}
                  locationCoord={this.props.locationCoord}
                />
                <TagGuestPopup
                    ref={(dialog) => {
                        this.tagGuestDialog = dialog;
                    }}
                    initialGuests={this.state.taggedGuests}
                    guests={this.props.guests}
                    loading={this.props.loading}
                    onConfirm={this._setTaggedGuests}
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

export default connect(mapStateToProps, mapDispatchToProps)(ActionItem_edit );

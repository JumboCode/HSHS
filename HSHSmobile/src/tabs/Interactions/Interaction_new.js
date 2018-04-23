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
import { Button, Icon, List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import {connect} from 'react-redux';
import ChooseLocationPopup from '../../modules/popups/ChooseLocationPopup';

import TagGuestPopup from "../../modules/popups/TagGuestPopup"
import renderSeperator from '../../modules/UI/renderSeperator'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addInteractionItem, getActionItems} from "../../redux/actions";
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import Counter from '../../modules/Counter';

import Prompt from 'rn-prompt';

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

class Interaction_new extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));

        this.state = {
            promptVisible: false,
            taggedGuests: [],
            locationCoord: this.props.locationCoord ? this.props.locationCoord : {
            	longitude: 0,
            	latitude: 0,
            },
            locationStr: this.props.locationStr ? this.props.locationStr : null,
            date: Moment().format('YYYY-MM-DD'),
            interactionTimeStamp: Moment().format('YYYY-MM-DD'),
            description: "",
            items: [
              {name: "Item 0", count: 0, id: 0},
              {name: "Item 1", count: 0, id: 1},
              {name: "Item 2", count: 0, id: 2},
              {name: "Item 3", count: 0, id: 3},
              {name: "Item 4", count: 0, id: 4},
              {name: "Item 5", count: 0, id: 5},
              {name: "Item 6", count: 0, id: 6},
          ]
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
            		Alert.alert("Title cannot be empty");
            		return;
            	}
              this._save();;
            }
        }
    };

    _save = () => {
        addInteractionItem("", this.state.interactionTimeStamp,
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

    _renderCounter = (itemId) => {
      if (! (itemId in this.state.items)) {
        return (
          <View style={{flex: 1}}>
          {}
          </View>
        );
      }
      var self = this;
      return (
        <View style={{flex: 1}}>
          <Counter
            itemName={this.state.items[itemId].name}
            count={0}
            onValueChange= {(val) => {self._setItem(itemId, val)}}
            />
        </View>
      )
    };

    _setItem = (itemId, count) => {
      let items = this.state.items;
      items[itemId].count = count;
      this.setState({items: items});
    }

    _renderItems = () => {
      var views = [];
      for (var i = 0; i < this.state.items.length; i+=3) {
        views[i] =
          <View key = {i} style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
            {this._renderCounter(i)}
            {this._renderCounter(i + 1)}
            {this._renderCounter(i + 2)}
          </View>
        views[i].key;
      }
      return (views);
    }

    addItem = (value) => {
      var items = this.state.items;
      for (var i = 0; i < items.length; i++) {
        // item already in list
        if (items[i].name.toLowerCase() == value.toLowerCase()) {
          return false;
        }
      }

      var new_item = {
        name: value,
        id: items.length,
        count: 0,
      }

      items.push(new_item);
      return true;
    }

    render() {
        return (
            <View style = {styles.container}>
            <ScrollView style={{width: "100%"}}>
                <View style = {styles.back}>
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
                    {this._renderItems()}
                    <View style={{margin:10}}>
                      <Button
                      title = "Add Another Item"
                      onPress = {() => {this.setState({promptVisible: true})}}>
                      </Button>
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
                <Prompt
                  title="Name your item"
                  placeholder=""
                  visible={this.state.promptVisible}
                  onCancel={() => this.setState({ promptVisible: false })}
                  onSubmit={(value) => {
                    let success = this.addItem(value);
                    this.setState({ promptVisible: false });
                  }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Interaction_new );

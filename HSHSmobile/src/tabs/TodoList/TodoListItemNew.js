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


function mapStateToProps(state, ownProps) {
    var guests = guestObjectToArray(state.guests, state.interactions);
    return {
        guests: guests,
        item: null, //state.actionItems[ownProps.id],
        loading: state.loading,
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
            taggedGuests: [],
            selectedLocation: null,
            locationName: "No Location Selected",
        };
        setInterval(() => {console.log(this.state.taggedGuests);}, 2000); //TODO: DELETE DEBUG CODE
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

    setChosenLocation = (locationName) => {
        this.setState({locationName: locationName});
    };

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column',}}>
                <TextInput
                    style = {{padding: Platform.OS === 'ios' ? 12 : 10}}
                    editable = {true}
                    placeholder = "Title"
                />
                {renderSeperator()}
                <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                    <View>
                        <Icon
                            raised
                            color='#770B16'
                            name='person'
                            onPress={() => {
                                this.tagGuestDialog.show();
                            }}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Text numberOfLines={1} style={{textAlign: 'right',  margin: 10}}>{"X Guests Selected"}</Text>
                    </View>
                </View>
                {renderSeperator()}
                <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 0}}>
                    <View>
                        <Icon
                            raised
                            color='#770B16'
                            name='local-pizza'
                            onPress={() => {
                            this.mapModule.openMap({lat: 42.405804, lng: -71.11956})
                        }} />
                    </View>
                    <View style={{flex:1}}>
                        <Text numberOfLines={1} style={{textAlign: 'right',  margin: 10}}>{this.state.locationName}</Text>

                    </View>
                </View>
                {renderSeperator()}
                <View>
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
                    viewHeight={this.state.viewHeight}
                    viewWidth={this.state.viewWidth}
                    locationFunction={this.setChosenLocation.bind(this)}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps)(TodoListItemNew);

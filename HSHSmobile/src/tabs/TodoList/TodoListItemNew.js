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
            title: null,
            taggedGuests: [],
            selectedLocation: null,
            locationName: "No Location Selected",
            selectedDate: null,
            dateName: "No Date Selected",
        };
        setInterval(() => {
            console.log(this.state.taggedGuests);
        }, 2000); //TODO: DELETE DEBUG CODE
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
        let index = this.state.taggedGuests.indexOf(guest);
        let arr = this.state.taggedGuests;
        arr.splice(index, 1);
        this.setState({taggedGuests: arr})
    }

    setChosenLocation = (locationName) => {
        this.setState({locationName: locationName});
    };

    render2() {
        return (
            <View style={{flex: 1, flexDirection: 'column',}}>
                <TextInput
                    style={{padding: Platform.OS === 'ios' ? 12 : 10}}
                    editable={true}
                    placeholder="Title"
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
                            name='local-pizza'
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
                <View>
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

export default connect(mapStateToProps)(TodoListItemNew);

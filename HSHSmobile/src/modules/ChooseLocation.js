// Usage:
// You will need to create a ref in order to use all the functions within
// A function is passed in to set the location in the parent page
// See TodoListItemNew.js for example
/*
    <ChooseLocation
        ref={(map) => {
            this.mapModule = map;
        }}
        locationFunction={this.setChosenLocation.bind(this)}
    />
*/

// TODO : this has a serious bug interacting with navigation, we can try to resolve it by following
// https://github.com/jacklam718/react-native-popup-dialog/issues/42#issuecomment-310028245
// for now, I'm gonna just make the map small enough if dosn't matter.


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import PopupDialog, {SlideAnimation, DialogTitle, DialogButton, DefaultAnimation} from 'react-native-popup-dialog';
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

const Timestamp = require('react-timestamp');

export default class ChooseLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: {
                latitude: 42.405804,
                longitude: -71.11956,
            },
            address: "No Location Selected"
        };
        Geocoder.setApiKey('AIzaSyBk97FJAbAoOnu1liyLAGAne9dcYAiJ8Co');
    };

    openMap(info) {
        this.popupDialog.show();
    }

    dismissMap() {
        this.popupDialog.dismiss();
    }

    onMarkerLocationChange = (coordinate) => {
        console.log(coordinate.latitude, coordinate.longitude);
        Geocoder.getFromLatLng(coordinate.latitude, coordinate.longitude).then(
            json => {
                console.log(json.results[0]);
                let address_component = json.results[0].address_components[0].short_name + " " + json.results[0].address_components[1].short_name;
                this.setState(previousState => {
                    return { address: address_component };
                });
                this.props.locationFunction(address_component);
            },
            error => {
                alert(error);
            }
        );
        this.setState({x: coordinate})
    };

    render() {
        return (
            <PopupDialog

                ref={(popupDialog) => {
                    this.popupDialog = popupDialog;
                }}
                zIndex={2}
                dialogStyle={{ position: 'absolute', top: 20, width: '100%', height: 400 }}
                dialogTitle={<DialogTitle title={"Drag Marker to set a Location:\n" + this.state.address }/>}
            >
                <View>
                    <MapView
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: 42.405804,
                            longitude: -71.11956,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01,
                        }}>
                        <MapView.Marker draggable
                                        coordinate={this.state.x}
                                        onDragEnd={(e) => this.onMarkerLocationChange(e.nativeEvent.coordinate)}
                        />
                    </MapView>
                </View>
            </PopupDialog>
        );
    }
}


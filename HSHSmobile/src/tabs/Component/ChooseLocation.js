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
//
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
            }
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
                alert(address_component);
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
                width={0.9 * Dimensions.get('window').width}
            >
                <View>
                    <MapView
                        style={{
                            height: Dimensions.get('window').height * 0.4,
                            width: 0.9 * Dimensions.get('window').width,
                            margin: 0
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


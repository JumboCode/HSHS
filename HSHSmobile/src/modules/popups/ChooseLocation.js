import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import renderSeperator from "../UI/renderSeperator"
import Popup from "./popup"
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {Icon} from 'react-native-elements';

const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = 0.01;

// Before Geolocation gets current location, or incase geolocation fails
const initiallocationCoord = {
  latitude: 42.3736,
  longitude: -71.1190,
}

// Needs an onSave function passed, that takes (coordinate, address) as parameters
export default class ChooseLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationCoord:
        (this.props.locationCoord
          && (this.props.locationCoord.latitude != 0
          && this.props.locationCoord.longitude != 0))
        ? this.props.locationCoord
        : initiallocationCoord,
      locationStr: this.props.locationStr ? this.props.locationStr : null,
      isMapFullScreen: true
    };
    Geocoder.setApiKey('AIzaSyBk97FJAbAoOnu1liyLAGAne9dcYAiJ8Co');
  }

  componentDidMount() {
      navigator.geolocation.watchPosition((pos) => {
        this.setState({
          locationCoord: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        });
      }, (error) => {
        Alert.alert(error.message);
      }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 50});
  };

  onMarkerLocationChange = (coordinate) => {
      Geocoder.getFromLatLng(coordinate.latitude, coordinate.longitude).then(
          json => {
              let address_component = json.results[0].address_components[0].short_name + " " + json.results[0].address_components[1].short_name;
              this.props.onChangeLocation(address_component, coordinate);
          },
          error => {
              Alert.alert(error);
          }
      );
  };

  render() {
    var titleString = "Drag Marker to set a Location:\n" + (this.state.locationStr == null ? "No Location Selected" : this.state.locationStr);

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'
      }}>
        <View>
          <MapView
              ref={(map) => {
                this.map = map }
              }
              style={{
                height: this.state.isMapFullScreen ? Dimensions.get('window').height * 0.3 : Dimensions.get('window').height,
                width: Dimensions.get('window').width * 0.9,
                margin: 0,
                borderRadius: 20
              }}
              showsUserLocation={true}
              region={{
                  latitude: this.state.locationCoord.latitude,
                  longitude: this.state.locationCoord.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.01,
              }}>
              <MapView.Marker draggable
                              coordinate={this.state.locationCoord}
                              onDragEnd={(e) => this.onMarkerLocationChange(e.nativeEvent.coordinate)}
              />
          </MapView>
          <View style={{
              position: 'absolute',
              top: 0,
              left: 0
          }}>
              <Icon
                  size={36}
                  underlayColor='transparent'
                  name={this.state.isMapFullScreen ? 'fullscreen' : 'fullscreen-exit'}
                  color='#3a4548'
                  onPress={() => {
                      this.setState(previousState => {
                          return {isMapFullScreen: !previousState.isMapFullScreen};
                      });
                  }}/>
          </View>

          <View style={{
              position: 'absolute',
              top: 5,
              right: 5
          }}>
              <Icon
                  size={28}
                  underlayColor='transparent'
                  name='my-location'
                  color='#0579f9'
                  onPress={() => {
                      navigator.geolocation.getCurrentPosition((pos) => {
                        this.setState({
                          curLat: pos.coords.latitude,
                          curLong: pos.coords.longitude
                        });
                      }, (error) => {
                        Alert.alert(error.message);
                      }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
                  }}
              />
          </View>
          </View>
      </View>
    );
  }
}

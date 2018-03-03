import React, { Component } from "react";
import { Text, TouchableOpacity, View, alert } from "react-native";
import Modal from "react-native-modal";
import renderSeperator from "../UI/renderSeperator"
import Popup from "./popup"
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';


const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = 0.01;

// Before Geolocation gets current location, or incase geolocation fails
const initiallocationCoord = {
  latitude: 42.3736,
  longitude: -71.1190,
}

// Needs an onSave function passed, that takes (coordinate, address) as parameters
export default class ChooseLocationPopup extends Component {
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
    };
    Geocoder.setApiKey('AIzaSyBk97FJAbAoOnu1liyLAGAne9dcYAiJ8Co');
  }

  show = () => {
    this.Popup.show()
  };

  renderContent = () => {
    return(
      <View style={{
        height: "80%",
        width: "100%",
      }}>
          <MapView
              ref={(map) => {
                this.map = map }
              }
              style={{
                  height: "100%",
                  width: "100%",
              }}
              showsUserLocation={true}
              initialRegion={{
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
      </View>
    );
  };

  onMarkerLocationChange = (coordinate) => {
      Geocoder.getFromLatLng(coordinate.latitude, coordinate.longitude).then(
          json => {
              let address_component = json.results[0].address_components[0].short_name + " " + json.results[0].address_components[1].short_name;
              this.setState(previousState => {
                  return { locationStr: address_component };
              });
          },
          error => {
              alert(error);
          }
      );
      this.setState({locationCoord: coordinate})
  };

  render() {
    var titleString = "Drag Marker to set a Location:\n" + (this.state.locationStr == null ? "No Location Selected" : this.state.locationStr);

    return (
      <Popup
        ref={(popup) => {
            this.Popup = popup;
        }}
        title={titleString}
        onConfirm={()=>{this.props.onConfirm(this.state.locationStr, this.state.locationCoord)}}
        onCancel={()=>{}}
        confimDisable={this.state.locationStr == null}
        >
        {this.renderContent()}
      </Popup>
    );
  }
}

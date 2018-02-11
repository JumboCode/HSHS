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
const initialCoords = {
  latitude: 42.3736,
  longitude: -71.1190,
}

// Needs an onSave function passed, that takes (coordinate, address) as parameters
export default class ChooseLocationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: initialCoords,
      address: null,
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
                  latitude: this.state.coordinate.latitude,
                  longitude: this.state.coordinate.longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.01,
              }}>
              <MapView.Marker draggable
                              coordinate={this.state.coordinate}
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
                  return { address: address_component };
              });
          },
          error => {
              alert(error);
          }
      );
      this.setState({coords: coordinate})
  };

  render() {
    var titleString = "Drag Marker to set a Location:\n" + (this.state.address == null ? "No Location Selected" : this.state.address);

    return (
      <Popup
        ref={(popup) => {
            this.Popup = popup;
        }}
        title={titleString}
        onConfirm={()=>{this.props.onConfirm(this.state.address, this.state.coordinate)}}
        onCancel={()=>{}}
        confimDisable={this.state.address == null}
        >
        {this.renderContent()}
      </Popup>
    );
  }
}

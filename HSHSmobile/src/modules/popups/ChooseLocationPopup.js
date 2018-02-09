import React, { Component } from "react";
import { Text, TouchableOpacity, View, alert } from "react-native";
import Modal from "react-native-modal";
import renderSeperator from "../UI/renderSeperator"
import Popup from "./popup"
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

export default class ChooseLocationPopup extends Popup {
  constructor(props) {
      super(props);
      this.state = {
        
      }
  }
}

ChooseLocationPopup.defaultProps = {
  children: <View>
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
};

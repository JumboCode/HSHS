import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput, Dimensions, ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

const errMsg = "This field cannot be empty";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {k: "", keyErr: "",email: "", emailErr: "", password: "", passwordErr: ""};
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <FormLabel>Signup Key (Contact the admin for this)</FormLabel>
        <FormInput onChangeText={(text) => {this.setState({k: text})}}/>
        <FormValidationMessage>{this.state.keyErr}</FormValidationMessage>
        <FormLabel>Email Address</FormLabel>
        <FormInput onChangeText={(text) => {this.setState({email: text})}}/>
        <FormValidationMessage>{this.state.emailErr}</FormValidationMessage>
        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={(text) => {this.setState({password: text})}}/>
        <FormValidationMessage>{this.state.passwordErr}</FormValidationMessage>
        <Button onPress={() => {
            if (this.state.k === "") {
              this.setState({keyErr: errMsg});
              return;
            } else {
              this.setState({keyErr: ""});
            }
            if (this.state.email === "") {
              this.setState({emailErr: errMsg});
              return;
            } else {
              this.setState({emailErr: ""});
            }
            if (this.state.password === "") {
              this.setState({passwordErr: errMsg});
              return;
            } else {
              this.setState({passwordErr: ""});
            }
            fetch('https://us-central1-hshs-street-team.cloudfunctions.net/signUpPOST', {
              body: JSON.stringify({email: this.state.email, password: this.state.password, signupKey: this.state.k}), // must match 'Content-Type' header
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
            })
            .then(response => response.json()) // parses response to JSON
        }} title='Submit' />
      </View>
    )
  }
};

export default Signup;

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
import Icon from 'react-native-vector-icons/Ionicons';

const errMsg = "This field cannot be empty";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      k: "",
      keyErr: "",
      email: "",
      emailErr: "",
      password: "",
      lengthCheck: false,
      lowerCaseCheck: false,
      upperCaseCheck: false,
      numCheck: false
    };
  }

  render() {
    return (
      <ScrollView style={{flex: 1, flexDirection: 'column'}}>
        <FormLabel>Signup Key (Contact the admin for this)</FormLabel>
        <FormInput onChangeText={(text) => {this.setState({k: text})}}/>
        <FormValidationMessage>{this.state.keyErr}</FormValidationMessage>
        <FormLabel>Email Address</FormLabel>
        <FormInput onChangeText={(text) => {this.setState({email: text})}}/>
        <FormValidationMessage>{this.state.emailErr}</FormValidationMessage>
        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={(text) => {
          const lengthCheck = text.length >= 8;
          const upperCaseCheck = /[A-Z]/.test(text);
          const lowerCaseCheck = /[a-z]/.test(text);
          const numCheck = /\d/.test(text);
          this.setState({password: text, lengthCheck, upperCaseCheck, numCheck});

        }}/>
        <FormValidationMessage><Text style={{color: "black"}}>Your password must contain the following:</Text></FormValidationMessage>
        <FormValidationMessage>
          {this.state.lengthCheck ?
            <Icon name="md-checkmark" size={20} color="green" /> :
            <Icon name="md-close" size={20} color="red" />
          }
          <Text style={{...(this.state.lengthCheck ? {color: 'green'} : {color: 'red'})}}>
            {' '}At least 8 characters
          </Text>
        </FormValidationMessage>
        <FormValidationMessage>
          {this.state.upperCaseCheck ?
            <Icon name="md-checkmark" size={20} color="green" /> :
            <Icon name="md-close" size={20} color="red" />
          }
          <Text style={{...(this.state.upperCaseCheck ? {color: 'green'} : {color: 'red'})}}>
            {' '}At least one uppercase letter
          </Text>
        </FormValidationMessage>
        <FormValidationMessage>
          {this.state.lowerCaseCheck ?
            <Icon name="md-checkmark" size={20} color="green" /> :
            <Icon name="md-close" size={20} color="red" />
          }
          <Text style={{...(this.state.lowerCaseCheck ? {color: 'green'} : {color: 'red'})}}>
            {' '}At least one lowercase letter
          </Text>
        </FormValidationMessage>
        <FormValidationMessage>
          {this.state.numCheck ?
            <Icon name="md-checkmark" size={20} color="green" /> :
            <Icon name="md-close" size={20} color="red" />
          }
          <Text style={{...(this.state.numCheck ? {color: 'green'} : {color: 'red'})}}>
            {' '}At least one number
          </Text>
        </FormValidationMessage>
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
            if (! (this.state.lengthCheck && this.state.upperCaseCheck && this.state.lowerCaseCheck && this.state.numCheck)) {return;}
            fetch('https://us-central1-hshs-street-team.cloudfunctions.net/signUpPOST', {
              body: JSON.stringify({email: this.state.email, password: this.state.password, signupKey: this.state.k}), // must match 'Content-Type' header
              method: 'POST',
              headers: {'content-type': 'application/json'}
            }).then(response => console.log(response))
        }} title='Submit' />
      </ScrollView>
    )
  }
};

export default Signup;

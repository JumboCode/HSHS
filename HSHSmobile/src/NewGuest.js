import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert
} from 'react-native';

export default class NewGuest extends Component<{}> {
    constructor(props) {
        super(props);

        // How should we store this input?
        this.state = {name: '', birthdate: '', hometown: '', other: ''};

    }

    render () {
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  placeholder="Type your name here!"
                  onChangeText=  {(text) => this.setState(prevState =>
                                                    {prevState.name = text})
                                 }
                />
                <TextInput
                  style={{height: 40}}
                  placeholder="Type your birthdate here!"
                  onChangeText=  {(text) => this.setState(prevState =>
                                                        {prevState.birthdate = text})
                                 }
                />
                <TextInput
                  style={{height: 40}}
                  placeholder="Type your hometown here!"
                  onChangeText=  {(text) => this.setState(prevState =>
                                                        {prevState.hometown = text})
                                 }
                />
                <TextInput
                  style={{height: 40}}
                  placeholder="Type anything else!"
                  onChangeText=  {(text) => this.setState(prevState =>
                                                        {prevState.other = text})
                                 }
                />
                <Button
                  style={{height: 50}}
                  onPress={() => { Alert.alert(this._jsonOutput());}}
                  title="Submit"
                />
            </View>
        );
    }


}

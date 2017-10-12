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
        this.state = {name: 'example', birthdate: 'example', hometown: 'example', other: 'example'};

        this._jsonOutput = this._jsonOutput.bind(this);
    }

    _jsonOutput() {
        return JSON.stringify(this.state);
    }

    render () {
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 10}}>
                <TextInput
                  style={{height: 40}}
                  placeholder="Type your name here!"
                  //onSubmitEditing={(text) => {}
                />
                <TextInput
                  style={{height: 40}}
                  placeholder="Type your birthdate here!"
                />
                <TextInput
                  style={{height: 40}}
                  placeholder="Type your hometown here!"
                />
                <TextInput
                  style={{height: 40}}
                  placeholder="Type anything else!"
                />
                <Button
                  style={{height: 50}}
<<<<<<< HEAD
                  onPress={() => { Alert.alert(this._jsonOutput());}}
=======
                  onPress={() => { Alert.alert("hello");}}
>>>>>>> 893885d7d4a240eef0e461b16834ae2627ba79aa
                  title="Submit"
                />
            </View>
        );
    }


}

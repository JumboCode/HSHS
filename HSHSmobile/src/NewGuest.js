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
<<<<<<< HEAD
        this.state = {name: '', birthdate: '', hometown: '', other: ''};
=======
        this.state = {name: 'example', birthdate: 'example', hometown: 'example', other: 'example'};

        this._jsonOutput = this._jsonOutput.bind(this);
    }

    _jsonOutput() {
        return JSON.stringify(this.state);
>>>>>>> Initial TextInput commit
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
                  onPress={() => { Alert.alert("hello");}}
=======
                  onPress={() => { Alert.alert(this._jsonOutput());}}
>>>>>>> Initial TextInput commit
                  title="Submit"
                />
            </View>
        );
    }


}

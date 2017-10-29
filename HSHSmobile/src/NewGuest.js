import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    Picker
} from 'react-native';

export default class NewGuest extends Component<{}> {
    constructor(props) {
        super(props);

        // How should we store this input?
        this.state = {name: '', birthdate: '', gender: '', other: ''};
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
                  onChangeText=  {(text) => this.setState({name: text})
                                 }
                />
                <TextInput
                  placeholder="Approximate Age"
                  keyboardType='numeric'
                  onChangeText=  {(text) => this.setState(prevState =>
                                                        {prevState.birthdate = text})
                                 }
                />
                <TextInput
                  style={{height: 40}}
                  placeholder="Type anything else!"
                  onChangeText=  {(text) => this.setState({other: text})}
                />
                <Picker
                  selectedValue={(this.state && this.state.gender) || 'm'}
                  onValueChange={(value) => {
                    this.setState({gender: value});
                  }}>
                  <Picker.Item label={'Male'} value={'m'} />
                  <Picker.Item label={'Female'} value={'f'} />
                  <Picker.Item label={'Non-Binary'} value={'nb'} />
                  <Picker.Item label={'Other'} value={'o'} />
                </Picker>
                <Button
                  style={{height: 50}}
                  onPress={() => { //Alert.alert(this._jsonOutput());
                      console.log(this._jsonOutput());
                      this.props.navigator.pop({
                                                animated: true, // does the pop have transition animation or does it happen immediately (optional)
                                                animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                                                }); }}
                  title="Submit"
                />
            </View>
        );
    }


}

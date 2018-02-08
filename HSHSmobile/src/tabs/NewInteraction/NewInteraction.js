/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {DialogTitle, DialogButton, DialogFooter} from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/Ionicons';
import Counter from '../../modules/Counter.js';
import PopupDialog_hshs from '../../modules/hshs_popup.js';


const instructions = Platform.select({
    ios: 'please make me an ios screen!',
    android: 'please make me an android screen!'
});

export default class Info extends Component {
    constructor(props) {
      super(props);
      this.counters = {"PB&Js": 2, "Water Bottles": 1, "Blankets": 3};
      this.state = {counterPromptVisible: false, counterPromptInput: ""};
    }

    renderCounters() {
      let items = Object.keys(this.counters);
      return (
        <View style={styles.counterContainer}>
            {
              items.map((name) =>
                      <Counter
                        key={name}
                        itemName={name}
                        count={this.counters[name]}
                        onValueChange={(val) =>
                            {
                              this.counters[name] = val;
                            }}
                      />)}
          <TouchableOpacity onPress={() => {this.addCounterDialog.show();}}>
              <Icon name="ios-add-circle" size={60} color="#900" />
          </TouchableOpacity>
        </View>
      );
    }


    // Re render the page when new counter added?
    //
    submitCounterPopup = () => {
      let newCounterName = this.state.counterPromptInput;
      if (newCounterName != "") {
        this.counters[newCounterName] = 0;
      }
      this.setState({counterPromptInput: ""});
      this.addCounterDialog.dismiss();
      this.render();
    }
    // Re render the page when new counter added?
    cancelCounterPopup = () => {
      this.setState({counterPromptInput: ""});
      this.addCounterDialog.dismiss();
    }

    renderCounterPopupButtons() {
      return (
          <View style={styles.popupDialogButtons}>
            <DialogButton text="Cancel" onPress={this.cancelCounterPopup}/>
            <DialogButton text="Submit" onPress={this.submitCounterPopup}/>
          </View>
      );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <PopupDialog_hshs
                  ref={(dialog) => {
                      this.addCounterDialog = dialog;
                  }}
                  dialogTitle={<DialogTitle title={"Add a New Item"}/>}
                  placeholder={"Item Name Here"}>
                    <View style={{flexDirection:'column'}}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={(counterPromptInput) => this.setState({counterPromptInput})}
                        value={this.state.counterPromptInput}
                      />
                      {this.renderCounterPopupButtons()}
                    </View>
                </PopupDialog_hshs>
                {this.renderCounters()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    popupDialogButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    textInput: {
      marginTop: 3,
      height: 40,
      width: "80%",
      borderColor: 'gray',
      borderWidth: 1
    },
});

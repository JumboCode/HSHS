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
    TouchableOpacity
} from 'react-native';
import Popup from "../../modules/popups/popup"

const instructions = Platform.select({
    ios: 'please make me an ios screen!',
    android: 'please make me an android screen!'
});

export default class Info extends Component {
    constructor(props) {
      super(props);
      this.counters = {"PB&Js": 2, "Water Bottles": 1, "Blankets": 3};
      this.state = {counterPromptVisible: false};
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
          <TouchableOpacity onPress={() => {}}>
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
          <View>
            <Text
            onPress= {()=>{this.Popup.show()}}
            >
            {"Click me to open"}
            </Text>
            <View style={styles.container}>
                <Popup
                  ref={(popup) => {
                      this.Popup = popup;
                  }}
                  title={"Title"}
                  onConfirm={()=>{}}
                  >
                  <Text>Test</Text>
                  <Text>Test</Text>
                </Popup>
            </View>
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

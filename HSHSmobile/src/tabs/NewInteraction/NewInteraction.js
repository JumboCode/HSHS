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
import Icon from 'react-native-vector-icons/Ionicons';
import Counter from '../../modules/Counter.js';
import PromptDialog from '../../modules/PromptDialog.js';

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
                        itemName={name}
                        count={this.counters[name]}
                        onValueChange={(val) =>
                            {
                              this.counters[name] = val;
                            }}
                      />)}
          <TouchableOpacity onPress={() => {this.promptDialog.show();}}>
              <Icon name="ios-add-circle" size={60} color="#900" />
          </TouchableOpacity>
        </View>
      );
    }


    // Re render the page when new counter added?
    addCounter = (newCounterName) => {
      this.counters[newCounterName] = 0;
      this.render();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <PromptDialog
                  ref={(dialog) => {
                      this.promptDialog = dialog;
                  }}
                  title = {"Add an Item"}
                  placeholder={"Item Name Here"}
                  onSubmit = {this.addCounter}
                  onCancel = {() => {}}
                />
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
    }
});

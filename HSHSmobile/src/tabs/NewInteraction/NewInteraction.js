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
    View
} from 'react-native';
import Popup from "../../modules/popups/popup"

const instructions = Platform.select({
    ios: 'please make me an ios screen!',
    android: 'please make me an android screen!'
});

export default class Info extends Component {
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
});

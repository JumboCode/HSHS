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
import Icon from 'react-native-vector-icons/Ionicons';
import Counter from '../../modules/Counter.js';

const instructions = Platform.select({
    ios: 'please make me an ios screen!',
    android: 'please make me an android screen!'
});

export default class Info extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <Counter count={0} itemName={"hello"}/>
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

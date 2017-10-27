/* GuestProfile */
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
    Image
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class Info extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image
                        style={styles.profile_image}
                        source={require("./dummy/default.jpg")}
                    />
                    <View style={styles.profile_info}>
                        <Text style={styles.name}>
                            profile.props.name?
                        </Text>
                        <Text>
                            receptive // add function that returns emoji based on number on profile
                        </Text>
                        <Text>
                            Last Interacted:
                        </Text>
                        <Text>
                            Description
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    top: {
        flex: 2,
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 10,
        padding: 10,
    },
    name: {
        fontSize: 22,
    },
    profile_info: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingLeft: 10,
        width: 225,
    },
    profile_image: {
        height: 80,
        width: 80,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 40,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
});

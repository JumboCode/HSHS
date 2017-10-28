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
import data from './dummy/data.json';

export default class Info extends Component {
    // convert string to int and map it to an index from our dummy data
    get_name_int = (name) => {
        val = 0;
        for(let i = 0; i < name.length; i++) {
            val += name.charCodeAt(i);
        }
        return val % 5;
    };

    // gets dummy values from data.json
    get_data = () => {
        return(data.guests[this.get_name_int(this.props.name)]);
    };

    // stores dummy values from data.json
    profile_data = this.get_data();

    // renders name on profile page
    render_name = () => {
        return (
            <Text style={styles.name}>
                {this.props.name}
            </Text>
        );
    };

    // renders receptive value (emoji?)
    render_receptive = () => {
        return (
            <Text>
                receptive // add function that returns emoji based on number on profile
            </Text>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image
                        style={styles.profile_image}
                        source={require("./dummy/default.jpg")}
                    />
                    <View style={styles.profile_info}>
                        {this.render_name()}
                        {this.render_receptive()}
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

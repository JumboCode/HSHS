/* GuestProfile */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import nodeEmoji from 'node-emoji';
import data from './dummy/data.json';

const Timestamp = require('react-timestamp');

export default class Info extends Component {
    id_to_emoji = [":smirk:", ":slightly_smiling_face:", ":grinning:", ":smiley:", ":smile:"];

    // convert string to int and map it to an index from our dummy data
    get_name_int = (name) => {
        val = 0;
        for(let i = 0; i < name.length; i++) {
            val += name.charCodeAt(i);
        }
        return val % 4;
    };

    // gets dummy values from data.json
    get_data = () => {
        return(data.guests[this.get_name_int(this.props.name)]);
    };

    // stores dummy values from data.json
    profile_data = this.get_data();

    // gets emoji from receptive value
    get_receptive = () => {
        return(nodeEmoji.get(this.id_to_emoji[this.profile_data.id]));
    };

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
                Receptive: {this.get_receptive()}
            </Text>
        );
    };

    // renders last interacted
    render_interacted = () => {
        return (
            <Text>
                Last Interacted: <Timestamp time={this.profile_data.last_interacted} component={Text}/>
            </Text>
        );
    };

    // render description
    render_description = () => {
        return (
            <Text>
                {this.profile_data.description}
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
                        {this.render_interacted()}
                        {this.render_description()}
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
    },
    profile_image: {
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
});

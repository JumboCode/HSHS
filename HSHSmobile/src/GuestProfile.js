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
    Image,
    FlatList,
} from 'react-native';
import nodeEmoji from 'node-emoji';
import data from './dummy/data.json';

const Timestamp = require('react-timestamp');

export default class Info extends Component {
    id_to_emoji = [":smirk:", ":slightly_smiling_face:", ":grinning:", ":smiley:", ":smile:"];

    /********************** Helper functions section **********************/

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
        return(nodeEmoji.get(this.id_to_emoji[this.profile_data.receptive]));
    };

    // get notes view template set up
    get_notes = (note_list) => {
        if(note_list) {
            return (
                <View style={styles.note_section}>
                    <Text style={styles.notes}>
                        Notes:
                    </Text>
                    {note_list}
                </View>
            );
        }
    };

    /********************** Render functions section **********************/

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

    // render notes
    render_notes = () => {
        let note_list = this.profile_data.notes;
        note_list = note_list.map((type) => <Text>{type}</Text>);

        return (this.get_notes(note_list));
    };

    /********************** Setup screen **********************/

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
                {this.render_notes()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    top: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "nowrap",
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    note_section: {
        flex: 5,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: 10,
        padding: 10,
    },
    notes: {
        fontSize: 22,
    },
    name: {
        fontSize: 22,
    },
    profile_image: {
        flex: 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 35,
    },
    profile_info: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        flexDirection: 'column',
        paddingLeft: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
});

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
import { List, ListItem } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import {connect} from 'react-redux';

const Timestamp = require('react-timestamp');

function mapStateToProps(state, ownProps) {
    return {
        guest: state.guests[ownProps.Id],
        loading: state.loading,
        testing: state
    };
}


class GuestProfile extends Component {
    constructor(props) {
        super(props);
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.view_crud_note_page = this.view_crud_note_page.bind(this);
        console.log(this.props.testing);
    };

    // matching receptivity to emojis {0-4} where 4 is the best and 0 is the worst
    id_to_emoji = [":smirk:", ":slightly_smiling_face:", ":grinning:", ":smiley:", ":smile:"];

    /********************** Helper functions section **********************/

    // gets emoji from receptive value
    get_receptive = () => {
        return(nodeEmoji.get(this.id_to_emoji[this.profile_data.receptive]));
    };

    //
    view_crud_note_page = () => {
      this.props.navigator.push({
          screen: 'CRUDnote', // unique ID registered with Navigation.registerScreen
          passProps: {
              name: this.props.guest.name
          }, // Object that will be passed as props to the pushed screen (optional)
          animated: true, // does the push have transition animation or does it happen immediately (optional)
          animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
          backButtonHidden: false, // hide the back button altogether (optional)
          navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
          navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
      });
    };
    /********************** Render functions section **********************/

    // renders name on profile page
    render_name = () => {
        return (
            <Text style={styles.name}>
                {this.props.guest.name}
            </Text>
        );
    };

    // renders age on profile page
    render_age = () => {
        return (
            <Text style={styles.note}>
                {this.props.guest.age}
            </Text>
        );
    };

    // renders description on profile page
    render_description = () => {
        return (
            <Text>
                {this.props.guest.description}
            </Text>
        );
    };


    // renders gender on profile page
    render_gender = () => {
        return (
            <Text>
                {this.props.guest.gender}
            </Text>
        );
    };

    // renders gender on profile page
    render_hairColor = () => {
        return (
            <Text style={styles.note}>
                {this.props.guest.hairColor}
            </Text>
        );
    };

    // renders gender on profile page
    render_tattoo = () => {
        return (
            <Text>
                {this.props.guest.tattoo}
            </Text>
        );
    };

    // renders receptive value (emoji?)
    render_receptive = () => {
        return (
            <Text>
                Receptive: {this.props.guest.get_receptive()}
            </Text>
        );
    };

    // renders last interacted
    render_interacted = () => {
        return (
            <Text>
                Last Interacted: <Timestamp time={this.props.guest.last_interacted} component={Text}/>
            </Text>
        );
    };

    // render description
    render_description = () => {
        return (
            <Text style={styles.note}>
                {this.props.guest.description}
            </Text>
        );
    };

    // render notes
    render_notes = () => {
        let note_list = this.profile_data.notes;
        if(note_list) {
            return (
                <View style={styles.note_section}>
                    <Text style={styles.notes}>
                        Notes:
                    </Text>
                    <FlatList
                        data={note_list}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.note}
                                onPress={() => this.view_crud_note_page()}
                            />
                        )}
                        style={styles.note}
                        keyExtractor={item => item.note}
                    />
                </View>
            );
        }
    };

    /********************** Setup screen **********************/

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.profile_info}>
                        {this.render_name()}
                        {this.render_age()}
                        {this.render_gender()}
                        {this.render_interacted()}
                        {this.render_description()}
                        {/*{this.render_receptive()}*/}
                    </View>
                </View>
                <View>
                    <Text>
                        THIS IS WHERE OTHER STUFF GOES
                    </Text>
                </View>
                {/*{this.render_notes()}*/}
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
        flex: 0.33,
        flexDirection: "row",
        flexWrap: "nowrap",
        padding: 10,
        alignItems: "center",
        backgroundColor: "#84232d",
    },
    note_section: {
        flex: 5,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: 10,
        padding: 10,
    },
    note: {
        flexDirection: 'row',
    },
    notes: {
        fontSize: 15,
    },
    name: {
        fontSize: 25,
        textDecorationColor:'#686868',
        fontFamily: 'Times New Roman',
        marginBottom: 1,
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
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        justifyContent: "flex-start",
        borderRadius: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
    last_interacted: {
        fontWeight: "400",
        fontStyle: 'italic',
    },
});

export default connect(mapStateToProps)(GuestProfile);

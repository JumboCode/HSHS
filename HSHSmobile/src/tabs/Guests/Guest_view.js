/* GuestProfile */
/**
 * !!! this page does NOT use dupNavFix, because using it breaks clicking on action item
 * and everything works as expected without it. Might have to revist later.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import {connect} from 'react-redux';
import ActionItemList_module from '../../modules/ActionItemList_module';
import GuestHistoryModule from '../../modules/GuestHistory';
import Icon from 'react-native-vector-icons/Feather';

const Timestamp = require('react-timestamp');

function mapStateToProps(state, ownProps) {
    return {
        guest: state.guests[ownProps.Id],
        guestId: ownProps.Id,
        allGuests: state.guests,
        loading: state.loading,
        actionItems: state.actionItems,
        interactions: state.interactions,
        completedActionItems: state.completedActionItems,
        actionItemIds: state.guestActionItemIds ? state.guestActionItemIds[ownProps.Id] : null
    };
}

function mapDispatchToProps(dispatch, ownProps) { return {}; }

class GuestProfile extends Component {
    constructor(props) {
        super(props);
        // this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.view_crud_note_page = this.view_crud_note_page.bind(this);
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
            <Text style={styles.age}>
                {this.props.guest.age}
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

    render_age_gender = () => {
        return (
            <View style={styles.age_gender}>
                {this.render_gender()}
                {this.render_age()}
            </View>
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
            <Text style={styles.last_interacted}>
                Last Interacted: <Timestamp time={this.props.guest.last_interacted} component={Text}/>
            </Text>
        );
    };

    // renders description
    render_description = () => {
        return (
            <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionScroll}>
                    {this.props.guest.description}
                  </Text>
            </View>
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

    // Commented out because it crashes probably bc Jacob Jaffe messed it up
    // Creates a list of actions items in which this guest is tagged
    _renderActionItems() {
        var actionItems = this.props.actionItems;
        return (
            <ActionItemList_module actionItems={this.props.actionItems}
                            guestActionItemIds={this.props.actionItemIds}
                            selectedGuestId={this.props.guestId}
                            guests={this.props.allGuests}
                            navigator={this.props.navigator} />
        )
    }

    // Renders add-new-interaction and add-action-item buttons
    _renderButtons() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.button} >
                    <Text style={styles.buttonText}>Add New Interaction</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    style={styles.button} >
                    <Text style={styles.buttonText}>Add Action Item</Text>
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.profile_info}>
                        {this.render_name()}
                        {this.render_age_gender()}
                        {this.render_interacted()}
                        {this.render_description()}
                        {/*{this.render_receptive()}*/}
                    </View>
                </View>
                <View style={{flex: .3}}>
                    {this._renderActionItems()}
                    {this._renderButtons()}
                </View>
                <GuestHistoryModule
                    style={{flex: .2}}
                    interactions={this.props.interactions}
                    completedActionItems={this.props.completedActionItems}
                    guestId={this.props.guestId}
                    navigator={this.props.navigator}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    buttonText: {
        color: 'white'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
        padding: 10,
        backgroundColor: '#006666',
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#D3D3D3',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#D3D3D3',
    },
    top: {
        flex: 0.38,
        flexDirection: "column",
        flexWrap: "nowrap",
        padding: 10,
        alignItems: "stretch",
        justifyContent: "flex-end",
        backgroundColor: "#E5DEDE",
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
        fontSize: 28,
        textDecorationColor:'#686868',
        fontFamily: 'Times New Roman',
        textAlign: 'center',
    },
    profile_image: {
        flex: 0.55,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 100,
    },
    profile_info: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        borderRadius: 12,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
    last_interacted: {
        fontWeight: "100",
        fontStyle: 'italic',
        color: "#7E7E7E",
    },
    age_gender: {
        flexDirection: "row",
    },
    age: {
        paddingLeft: 20,
    },
    descriptionScroll: {
      borderWidth: 0.3,
      borderColor: "#000000",
      borderRadius: 4,
      marginTop: 10,
      marginBottom: 5,
      padding: 10,
      width: '90%',
      alignSelf: 'center',
    },
    descriptionContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        paddingHorizontal: 10,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestProfile);

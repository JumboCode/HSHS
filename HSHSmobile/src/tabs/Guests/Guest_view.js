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
    TouchableOpacity
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import {connect} from 'react-redux';
import ActionItemList_module from '../../modules/ActionItemList_module';
import Icon from 'react-native-vector-icons/Feather';
import Timeline from 'react-native-timeline-listview';

const Timestamp = require('react-timestamp');

function mapStateToProps(state, ownProps) {
    return {
        guest: state.guests[ownProps.Id],
        guestId: ownProps.Id,
        allGuests: state.guests,
        loading: state.loading,
        actionItems: state.actionItems,
        actionItemIds: state.guestActionItemIds[ownProps.Id]
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
                <Text style={styles.description}>
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

    _renderHistoryListItem(item) {

    }

    // let date = new Date(item.item.creationTimestamp).toDateString();
    // let color = (item.color == undefined ? 'red' : item.color);
    // return (
    //     <View style={{flexDirection:'row'}}>
    //       <View style={{borderRightWidth: 1}}>
    //       <View style={{
    //         alignItems: 'center',
    //         backgroundColor: color,
    //         width: 5,
    //         height: 5,
    //         borderRadius: 5/2}}></View>
    //     </View>
    //     <View style={{flexDirection:'column', paddingLeft: 25}}>
    //         <Text style={{marginLeft:10}}>{date}</Text>
    //         <Text>{ item.isDone ? "Completed" : "Incomplete" }</Text>
    //         <View>
    //             <Text style={{marginLeft:10, paddingLeft:5}}>{item.item.title}</Text>
    //         </View>
    //     </View>
    //     </View>
    // );


    // Once interactions are added to Guest schema, interpolate w/ actionItems
    // and render in the list.
    _renderHistory() {
        let allActionItems = Object.values(this.props.actionItems);
        console.log("ALL ITEMS")
        console.log(allActionItems)

        let relatedActionItems = allActionItems.filter((actionItem) =>
                     { // Filter list to only include action items related to guest
                        if (actionItem.guestIds != undefined) {
                          return actionItem.guestIds.includes(this.props.guestId)
                        }
                      });

        if (relatedActionItems.length == 0) {
            return (
                <View style={styles.historyContainer}>
                    <Text style={styles.historyHeader}>Guest History</Text>
                    <Text>No action items or notes to display!</Text>
                </View>
            );
        }
        let data = relatedActionItems.map((i) =>
                      {
                        let date = new Date(i.creationTimestamp).toDateString();

                        let color;
                        if (i.color) {
                          color = 'red'; //hexToRgb(i.color);
                        } else {
                          color = 'red';
                        }

                        return ({time: date,
                                title: date,
                                description: i.description,
                                circleColor: color})
                      })

        return (
          <Timeline
            data={data}
            showTime={false}
            lineColor='#808080'
            descriptionStyle={{color:'gray'}}
            detailContainerStyle={styles.timelineDetailContainer}
            columnFormat='single-column-left'
            options={{
              style:{paddingTop:10}
            }}
          />
        );

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.profile_info}>
                        {this.render_name()}
                        {this.render_age_gender()}
                        {this.render_interacted()}
                        {this.render_description()}
                        {/*{this.render_receptive()}*/}
                    </View>
                </View>
                <View style={{flex: .5}}>
                    {/*this._renderActionItems()*/}
                    {this._renderButtons()}
                    {this._renderHistory()}
                </View>
            </View>
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
        flex: 0.33,
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
        fontSize: 35,
        textDecorationColor:'#686868',
        fontFamily: 'Times New Roman',

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
    description: {
        borderWidth: 0.3,
        borderColor: "#000000",
        borderRadius: 4,
        marginTop: 10,
        padding: 5
    },
    descriptionContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 10
    },
    historyContainer: {
        flexDirection: 'column',
        padding: 10
    },
    historyHeader: {
        marginLeft: 15,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 15
    },
    timelineDetailContainer: {
      marginBottom: 20,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: "#D3D3D3",
      borderRadius: 3,
      shadowColor: '#000111',
      shadowOffset: {
        width: 0,
        height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginRight: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GuestProfile);

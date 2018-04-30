//
// GuestHistoryModule
// Chase Troxell
// 4/29/18
// Renders a timeline that contains all history (ie
// completedActionItems & Interactions) related to the given guest.
// props: interactions - list of all interactions
//        completedActionItems - list of all completedActionItems
//        guestId - guest's id (for whom the timeline is being rendered)
//        navigator -
//        allGuests - a table containing all guests
// Example:
// <GuestHistoryModule
//     style={{flex: .2}}
//     interactions={this.props.interactions}
//     completedActionItems={this.props.completedActionItems}
//     guestId={this.props.guestId}
//     navigator={this.props.navigator}
//     allGuests={this.props.allGuests}
// />

// TODO: styling descriptions


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
import Timeline from 'react-native-timeline-listview';
import {Icon} from 'react-native-elements'

const Timestamp = require('react-timestamp');

const DESC_LIMIT = 14;

export default class GuestHistoryModule extends Component {
    constructor(props) {
        super(props);

        this.view_actionitem_page = this.view_actionitem_page.bind(this);
        this.view_interaction_page = this.view_interaction_page.bind(this);
    };

    // When actionitems are clicked, add the item's view to the
    // navigator stack
    view_actionitem_page = (actionItemId) => {
        this.props.navigator.push({
            screen: 'ActionItem_view', // unique ID registered with Navigation.registerScreen
            passProps: {
                actionItemId: actionItemId,
                completed: true
            }, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        });
    };

    // When interactions are clicked, add the interaction's view to the
    // navigator stack
    view_interaction_page = (interactionId) => {
        console.log(interactionId)
        this.props.navigator.push({
            screen: 'Interaction_view', // unique ID registered with Navigation.registerScreen
            passProps: {
                interactionId: interactionId,
            }, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        });
    };

    // TODO add ICONS
    _generateInteractionView = (data) => {
      // console.log("Generating interaction description from ")
      // console.log(data)
      return (
        <View style={{flexDirection: 'column'}}>
            <View style={{marginLeft: 15}}>
                <Text>{"Note: " + data.description}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.underDescription}>
                <Icon style={styles.underDescIcon} name='location-on'/>
                <Text style={styles.underDescription}>
                  {(data.locationStr == undefined) ?
                    "Add Location" :
                    data.locationStr.slice(0, DESC_LIMIT)}
                </Text>
              </View>
              <View style={styles.underDescription}>
                <Icon style={styles.underDescIcon} name='people'/>
                <Text style={styles.underDescription}>
                  {data.otherGuests.join(", ").slice(0, DESC_LIMIT)}
                </Text>
              </View>
              <TouchableOpacity
              onPress={() => this.view_interaction_page(data.interactionId)}
              >
                <Text>See More</Text>
              </TouchableOpacity>
            </View>
        </View>
      );
    }

    // Generates the views for each item in the timeline based on the type of
    // item. Returns detail view for each item
    _renderHistoryDetail = (rowData, _, __) => {
        let date = (<Text style={styles.historyHeader}>{rowData.date}</Text>);

        var desc = null
        if (rowData.isActionItem) { // Action item timeline view
            desc = (
            <View style={{flexDirection: 'column', marginLeft:10}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                style={{flex:99, borderLeftColor: rowData.color, padding: 5, borderWidth: 1, borderLeftWidth: 10, borderRightWidth: 0}}
                onPress={() => this.view_actionitem_page(rowData.actionItemId)}
                >
                  <Text>{rowData.title}</Text>
                </TouchableOpacity>
              </View>
            </View>)
        } else { // Interaction timeline view
          desc = this._generateInteractionView(rowData)
        }

        return (
          <View style={styles.timelineDetailContainer}>
            {date}
            {desc}
          </View>
        )
    }

    // Combines all actionItems and Interactions and returns a list filtered
    // to only include those to which guestId is linked
    _getRelatedHistory = () => {
        let allHistory = [];

        // If there are actionItems add to list
        if (this.props.completedActionItems) {
            // Object.values gets all the values from table w/out keys
            // ie instead of -FDSFDS: {actionItem}, gets just {actionItem}
            let completedActionItems = Object.values(this.props.completedActionItems);
            allHistory = completedActionItems;

        }
        // If there are interactions, add to list
        if (this.props.interactions) {
          let allInteractions = Object.values(this.props.interactions);
          let interactionKeys = Object.keys(this.props.interactions);
          // Add interactionID field to in all interactions
          interactionKeys.map((k, i) => {
              allInteractions[i]['interactionId'] = k;
          });
          allHistory = allHistory.concat(allInteractions);
        }

        // Filter list to include action items related to guestId
        let relatedHistory = allHistory.filter((item) =>{
                        if (item.guestIds != undefined) {
                          return item.guestIds.includes(this.props.guestId);
                        }});

        return relatedHistory;
    }

    // Reconciles the two types of data being interpolated (interactions/action items)
    // into one format which is used to display the items in the timeline
    // TODO isActionItem is janky
    _formatHistoryForTimeline = (relatedHistory) => {
        let reformattedHistory = relatedHistory.map((i) => {
                      let date = new Date(i.creationTimestamp).toDateString();
                      let otherGuests = [];
                      if (this.props.allGuests != undefined) {
                        otherGuests = i.guestIds.filter((j) => (j != this.props.guestId)
                                                      ).map((id) => this.props.allGuests[id].name);
                      }
                      return ({timestamp: i.creationTimestamp,
                              interactionTimestamp: i.interactionTimestamp,
                              date: date,
                              title: i.title,
                              color: i.color,
                              description: i.description,
                              isActionItem: (i.actionItemId != undefined),
                              actionItemId: i.actionItemId,
                              interactionId: i.interactionId,
                              locationStr: i.locationStr,
                              otherGuests: otherGuests})});
        return reformattedHistory;
    }

    // Gets all history related to the guest, renders timeline based on history
    render() {
        let relatedHistory = this._getRelatedHistory();

        // If guest has no history, tell the user!
        if (relatedHistory.length == 0) {
            return (
                <View style={styles.historyContainer}>
                  {/* <Text style={styles.historyHeader}>Guest History</Text>*/}
                  <Text>No history to display!</Text>
                </View>
            );
        }

        // Reformat action items for display in timeline
        let timelineData = this._formatHistoryForTimeline(relatedHistory)


        // Sort timelineDate by date (most recent to least)
        timelineData.sort((x, y) => {
            let xDate = new Date(x.timestamp);
            let yDate = new Date(y.timestamp);
            return xDate > yDate ? -1 : xDate < yDate ? 1 : 0;
        });

        return (
          <View>
            {/* <Text style={styles.historyHeader}>Guest History</Text>*/}
            <Timeline
              data={timelineData}
              showTime={false}
              lineColor='grey'
              circleColor='black'
              descriptionStyle={{color:'grey'}}
              columnFormat='single-column-left'
              renderDetail={this._renderHistoryDetail}
              options={{
                style:{paddingTop:10, flex:1}
              }}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    historyContainer: {
        flexDirection: 'column',
        padding: 10
    },
    historyHeader: {
        marginBottom: 5,
        paddingTop: 5,
        paddingLeft: 10,
        fontWeight: '400',
        fontSize: 16,
        color: 'gray'
    },
    timelineDetailContainer: {
      marginTop: -5,
      marginBottom: 20,
      paddingLeft: 5,
      paddingRight: 5,
      borderRadius: 3,
      shadowColor: '#000111',
      shadowOffset: {
        width: 0,
        height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 1,
      marginRight: 10,
  },
  underDescription: {
    color: 'blue',
    flex: 33,
    textDecorationLine: 'underline',
    margin: 5,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  underDescIcon: {
    shadowColor: '#000111',
    shadowOffset: {
      width: 1,
      height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
    marginRight: 2,
  }
});

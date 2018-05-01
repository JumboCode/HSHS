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

const DESC_LIMIT = 17;

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

    // Generates the general description for each card
    _generateDescription = (data, itemView) => {
      return (
        <View style={{flexDirection: 'column'}}>
            {itemView}
            <View style={{flexDirection: 'row', marginLeft: 5}}>
              {(data.otherGuests.length != 0) ?
                  <View style={styles.underDescription}>
                    <Icon style={styles.underDescIcon} name='people-outline' color='#3a4548'/>
                    <Text style={styles.underDescText}>
                      {(data.otherGuests.length == 0) ?
                       "No others." : data.otherGuests.join(", ")}
                    </Text>
                </View> :
                <View style={styles.underDescription}></View>
              }
              <View style={styles.underDescription}>
                <Icon style={styles.underDescIcon} name='location-on' color={data.locationStr === "Shelter" ? "#770B16" : '#3a4548'}/>
                <Text style={data.locationStr === "Shelter" ? {color: "#770B16"} : styles.underDescText}>
                  {data.locationStr}
                </Text>
              </View>
            </View>
        </View>
      );
    }

    // Generates the views for each item in the timeline based on the type of
    // item. Returns detail view for each item
    _renderHistoryDetail = (rowData, _, __) => {
        let navigatorFunction = null;
        let desc = null;

        if (rowData.isActionItem) { // Action item timeline view
            // used to navigate to item's view on detail card press
            // navigatorFunction = () => {this.view_actionitem_page(rowData.actionItemId)};
            // renders item-dependent description part of each card
            actionItemView = (
              <View
              style={styles.actionItemDesc}
              >
                <View style={styles.actionItemColorBar} />
                <View style={{flex:95}}>
                  <Text>
                  <Text style={{fontWeight: 'bold'}}>Completed: </Text>
                  <Text>{rowData.title}</Text></Text>
                </View>
              </View>)
            desc = this._generateDescription(rowData, actionItemView)
        } else { // Interaction timeline view
          // navigatorFunction = () => {this.view_interaction_page(rowData.interactionId)}
          interactionView = (
            <View style={{marginLeft: 15}}>
              <Text>
              <Text style={{fontWeight: 'bold'}}>Note: </Text>
              <Text>{rowData.description}</Text></Text>
            </View>)
          desc = this._generateDescription(rowData, interactionView)
        }

        let date = (<Text style={styles.historyHeader}>{rowData.date}</Text>);

        // Entire card is touchable opacity w/ date header and description
        // as generated above
        return (
          <TouchableOpacity
          onPress={navigatorFunction}
          style={styles.timelineDetailContainer}
          >
            {date}
            {desc}
          </TouchableOpacity>
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
                  <Text>No history to display.</Text>
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
            <Timeline
              data={timelineData}
              showTime={false}
              lineColor='grey'
              lineWidth={1.5}
              circleColor='rgb(136, 173, 214)'
              columnFormat='single-column-left'
              renderDetail={this._renderHistoryDetail}
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
        color: '#2e3c40'
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
    flex: 40,
    paddingLeft: 3,
    margin: 5,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  underDescText: {
    // color: 'blue',
    // textDecorationLine: 'underline',
    paddingLeft: 3
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
  },
  actionItemDesc: {
    marginLeft: 15,
    flexDirection: 'row'
  },
  actionItemColorBar: {
    backgroundColor: 'green',
    flex: 1,
    marginRight: 5
  }
});

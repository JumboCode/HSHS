import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import { List, ListItem, SearchBar, ButtonGroup } from "react-native-elements";
import {connect} from 'react-redux';
import ActionItemList_module from '../../modules/ActionItemList_module'
import { Icon } from 'react-native-elements'
import renderLoader from "../../modules/UI/renderLoader";
import dupNavFix from "../../dupNavFix";
import {markActionItemAsDone} from "../../redux/actions";
import {markActionItemAsTodo} from "../../redux/actions";

// for navigation
const IonIcon = require('react-native-vector-icons/Ionicons');


function mapStateToProps(state, ownProps) {

    // TODO: Make this a more legit way to add the ID:
    for (var id in state.actionItems) {
      state.actionItems[id].actionItemId = id;
    }

    for (var id in state.completedActionItems) {
        state.completedActionItems[id].actionItemId = id;
    }

    return {
        actionItems: state.actionItems,
        completedActionItems: state.completedActionItems,
        guests: state.guests,
        loading: state.loading,
        interactions: state.interactions
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {
        markActionItemAsDone: markActionItemAsDone,
        markActionItemAsTodo: markActionItemAsTodo
    };
}

class ActionItem_list extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.loading = true;

        this.state = {
            selectedIndex: 0,
            buttons: ["To do", "Completed"]
        }
    };

    onNavigatorEvent = (event) => { // this is the onPress handler for the two buttons together
           if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
               if (event.id == 'new_actionItem') { // this is the same id field from the static navigatorButtons definition
                 this.props.navigateTo({
                           title: 'Add Action Item',
                           screen: 'ActionItem_edit', // unique ID registered with Navigation.registerScreen

                           // No pass props because new default
                           passProps: {
                           }, // Object that will be passed as props to the pushed screen (optional)

                           animated: true, // does the push have transition animation or does it happen immediately (optional)
                           animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
                           backButtonHidden: false, // hide the back button altogether (optional)
                           navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                           navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                       })
               }
           }
       };

    componentDidMount() {
        IonIcon.getImageSource('ios-create-outline', 36).then((icon) => {
            this.props.navigator.setButtons({
                rightButtons: [
                    { id: 'new_actionItem', icon: icon },
                ]
            });
        });
    };

    render() {
        // TODO : make it actually check if the action items are of a valid type
        if (this.props.loading == true || !this.props.actionItems || this.props.actionItems.length <= 1) {
            return renderLoader();
        }

        return (
          <View
          style={{height: '100%'}}>
            <ButtonGroup
                onPress={(i) => {this.setState({selectedIndex: i})}}
                selectedIndex={this.state.selectedIndex}
                buttons={this.state.buttons}
                selectedTextStyle={{color: '#770B16'}}
            />

            {this.state.selectedIndex === 1 ?
                (<ActionItemList_module
                    actionItems={this.props.completedActionItems}
                    completed={true}    // needed so ActionItem_view knows where to pull data from
                    guests={this.props.guests}
                    navigator={this.props.navigator}
                    doneFunction={this.props.markActionItemAsTodo}/>) :
                (<ActionItemList_module
                    actionItems={this.props.actionItems}
                    completed={false}
                    guests={this.props.guests}
                    navigator={this.props.navigator}
                    doneFunction={ this.props.markActionItemAsDone}/>)}

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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(dupNavFix(ActionItem_list));

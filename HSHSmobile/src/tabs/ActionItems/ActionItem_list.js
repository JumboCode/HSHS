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

    static navigatorButtons = {
        rightButtons: [
          {
            title: 'Add', // for a textual button, provide the button title (label)
            id: 'new_actionItem', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
            disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
            showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
            buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
            buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
            buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
          }
        ]
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
        IonIcon.getImageSource('md-create', 36).then((icon) => {
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
            />

            {this.state.selectedIndex === 1 ? 
                (<ActionItemList_module
                    actionItems={this.props.completedActionItems}
                    guests={this.props.guests}
                    navigator={this.props.navigator} />) : 
                (<ActionItemList_module
                    actionItems={this.props.actionItems}
                    guests={this.props.guests}
                    navigator={this.props.navigator} />)}
            
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

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {List, ListItem, SearchBar} from "react-native-elements";
import {connect} from 'react-redux';
import PopupDialog, {SlideAnimation, DialogTitle, DialogButton, DefaultAnimation,} from 'react-native-popup-dialog';

let dimension = Dimensions.get('window');
let width = dimension.width, height = dimension.height;


import {Icon} from 'react-native-elements'

// for navigation
const IonIcon = require('react-native-vector-icons/Ionicons');


function mapStateToProps(state, ownProps) {
    return {
        actionItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        guests: [],
        loading: state.loading,
        interactions: state.interactions
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {};
}

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.loading = true;
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

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'new_actionItem') { // this is the same id field from the static navigatorButtons definition
                alert("New Action Item"); // TODO: implement this
            }
        }
    };

    componentDidMount() {
        IonIcon.getImageSource('md-create', 36).then((icon) => {
            this.props.navigator.setButtons({
                rightButtons: [
                    {id: 'new_actionItem', icon: icon},
                ]
            });
        });
    };

    componentWillUpdate(nextProps, nextState) {

    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    marginLeft: 10
                }}
            />
        );
    };

    renderHeader = () => {
        return null;
    };

    renderLoading = () => {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 0,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    itemPressed = (item) => {
        // console.log(this.popupDialog);
        this.popup.show()
    };

    render() {
        // TODO : make it actually check if the action items are of a valid type
        if (this.props.loading == true || this.props.actionItems.length <= 1) {
            return this.renderLoading();
        }
        return (
            <View style={{flex: 1}}>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Here it is"/>}
                    width={width * 0.8}
                    height={height * 0.6}
                    overlayBackgroundColor="#000000"
                    ref={(tempRef) => { this.popup = tempRef; }}
                    dialogAnimation={new SlideAnimation({slideFrom: 'top'})}
                >
                    <Text>Hello HSHS</Text>
                </PopupDialog>
                {/*<PopupDialog*/}
                    {/*dialogTitle={<DialogTitle title="Dialog Title" />}*/}
                    {/*ref={(tempRef) => { this.popup = tempRef; }}*/}
                {/*>*/}
                    {/*<View>*/}
                        {/*<Text>Hello</Text>*/}
                    {/*</View>*/}
                {/*</PopupDialog>*/}
                <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0}}>
                    <FlatList
                        data={this.props.actionItems}
                        renderItem={({item}) => (

                            // TODO: populate colors by tags
                            <View style={{backgroundColor: getRandomColor()}}>
                                <ListItem
                                    title={"title"}
                                    titleStyle={{marginLeft: 0}}
                                    subtitle={
                                        <View style={{flex: 1, flexDirection: 'row',}}>
                                            <View style={{flex: 2, flexDirection: 'row'}}>
                                                <View style={{flex: 1}}>
                                                    <Icon
                                                        name='person'/>
                                                </View>
                                                <View style={{flex: 3}}>
                                                    <Text numberOfLines={1}>{getRandomGuests()}</Text>
                                                </View>
                                            </View>
                                            <View style={{flex: 2, flexDirection: 'row'}}>
                                                <View style={{flex: 1}}>
                                                    <Icon
                                                        name='local-pizza'/>
                                                </View>
                                                <View style={{flex: 3}}>
                                                    <Text numberOfLines={1}>{getRandomLocation()}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    } // TODO: fix that without an extra space, the last character is cut off
                                    subtitleStyle={{textAlign: 'right'}}
                                    containerStyle={{borderBottomWidth: 0, marginLeft: 10, backgroundColor: "#F5FCFF"}}
                                    onPress={() => {
                                        this.itemPressed(item)
                                    }}
                                />
                            </View>
                        )}
                        //keyExtractor = {item => item.Id}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                        refreshing={this.props.refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={50}
                    />
                </List>
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

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomGuests() {
    var names = ['Kristoph', 'kristoble', 'Jeramia', 'Margary', 'Clitus', 'Ron', 'Spoon', 'Moonflower', 'Fresh', 'Laundry'];
    var guests = '';
    var numGuests = 1 + Math.floor(Math.random() * 3);
    for (var i = 0; i < numGuests; i++) {
        guests += names[Math.floor(Math.random() * names.length)];

        if (i != numGuests - 1) {
            guests += ", "
        }
    }
    ;
    return guests;
};

function getRandomLocation() {
    var locations = ['San Fran Sisco', 'San Andreas', 'Casterly Rock', 'Fraggle Rock', 'Vegas', 'Yellow Stone', 'Patagonia', 'Intersection of Goose and Marmalaide'];
    return locations[Math.floor(Math.random() * locations.length)];
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

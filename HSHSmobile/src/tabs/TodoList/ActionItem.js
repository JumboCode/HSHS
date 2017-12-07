import React, { Component } from 'react';
import {
	FlatList,
	View,
	Text
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import { Icon } from 'react-native-elements'

// YOU GOTTA PASS THE NAVIGATOR AS A PROP FOR THIS TO WORK
class ActionItemList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actionItems: getActionItems(this.props.actionItems)
		};
        this.Screen_TodoListItem = this.Screen_TodoListItem.bind(this);
    }

    Screen_TodoListItem = (item) => {
        this.props.navigator.push({
            screen: 'TodoListItem', // unique ID registered with Navigation.registerScreen
            passProps: {
                id: item.id,
            }, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        })
    };

	render() {
		return (
			<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
				<FlatList
					data = {this.state.actionItems}
		            renderItem={({item}) => this.renderListItem(item)}
		            keyExtractor = {item => item.id}
		            ItemSeparatorComponent = {this.renderSeparator}
		            ListHeaderComponent = {this.renderHeader}
		            ListFooterComponent = {this.renderFooter}
		            refreshing = {this.props.refreshing}
		            onEndReached = {this.handleLoadMore}
		            onEndReachedThreshold = {50}
				/>
			</List>
		)
	}

    renderListItem(item) {
        return(
	        <View style={{backgroundColor: item.color}}>
	            <ListItem
	                title = {item.title}
	                titleStyle = {{marginLeft: 0}}
	                subtitle = {
	                    <View style={{flex: 1, flexDirection: 'row',}}>
	                        <View style={{flex: 2, flexDirection: 'row'}}>
	                            <View style={{flex:1}}>
	                                <Icon
	                                    name='person' />
	                            </View>
	                            <View style={{flex:3}}>
	                                <Text numberOfLines={1}>{item.guests}</Text>
	                            </View>
	                        </View>
	                        <View style={{flex: 2, flexDirection: 'row'}}>
	                            <View style={{flex:1}}>
	                                <Icon
	                                    name='local-pizza' />
	                            </View>
	                            <View style={{flex:3}}>
	                                <Text numberOfLines={1}>{item.locationStr}</Text>
	                            </View>
	                        </View>
	                    </View>
	                } // TODO: fix that without an extra space, the last character is cut off
	                subtitleStyle = {{textAlign: 'right'}}
	                containerStyle = {{ borderBottomWidth: 0, marginLeft: 10, backgroundColor:"#F5FCFF" }}
	                onPress = {() => this.Screen_TodoListItem(item)}
	            />
	        </View>
        )
    }

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

}

// TODO: populate guests, color and ensure that deleting guests removes from these action items.
function getActionItems(IdsToActionItems) {
    var actionItems = [];
    for (var Id in IdsToActionItems) {
        actionItems.push({
            title : IdsToActionItems[Id].title,
            guests: getRandomGuests(),
            color: getRandomColor(),
            locationStr: IdsToActionItems[Id].locationStr,
            id: Id,
        });
    }
    return actionItems;
}

function getRandomTitle() {
    var titles = ["Groceries", "Pay the electric bill", "Fix a sticky key", "Clean the printer ink", "Get a new battery", "Charge cones", "Call Comcast", "Netflix & Chill"];
    return titles[Math.floor(Math.random() * titles.length)];
}

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

        if (i != numGuests - 1 ) {
            guests += ", "
        }
    };
    return guests;
};

function getRandomLocation() {
    var locations = ['San Fran Sisco', 'San Andreas', 'Casterly Rock', 'Fraggle Rock', 'Vegas', 'Yellow Stone', 'Patagonia', 'Intersection of Goose and Marmalaide'];
    return locations[Math.floor(Math.random() * locations.length)];
};

export default ActionItemList;
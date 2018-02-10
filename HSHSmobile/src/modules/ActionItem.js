import React, { Component } from 'react';
import {
	FlatList,
	View,
	Text
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import { Icon } from 'react-native-elements'
import renderSeperator from "./UI/renderSeperator";
import renderLoader from "./UI/renderLoader";


const oneDayInSeconds = 86400000;

// YOU GOTTA PASS THE NAVIGATOR AS A PROP FOR THIS TO WORK
class ActionItemList extends Component {
	constructor(props) {
		super(props);
		this.state = {searchInput: ''};
		var actionItems = getActionItems(this.props.actionItems, this.props.guests);

		if (this.props.showDueSoon) {		// Show only actionItems due in 24 hours
			let now = Date.now();
			var dueSoon = [];

			for (i in actionItems) {
				for (j in actionItems[i].shiftDate) {
					let timeUntilDue = actionItems[i].shiftDate[j] - now;
					if (timeUntilDue > 0 && timeUntilDue < oneDayInSeconds) dueSoon.push(actionItems[i])
				}
			}
			actionItems = dueSoon;
		}

        this.Screen_TodoListItem = this.Screen_TodoListItem.bind(this);
    }

    Screen_TodoListItem = (item) => {
        this.props.navigator.push({
            screen: 'TodoListItem', // unique ID registered with Navigation.registerScreen
            passProps: {
                id: item.id,
            }, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        })
    };

    formatGuestNames = (guestIds) => {
    	if (!guestIds || guestIds.length == 0) {
    		return "No Selected Guests"
		}
        var formatedString = "";
    	for (id of guestIds) {
    		formatedString = formatedString + this.props.guests[id].name + ", ";
		}
		return formatedString
    };

	render() {
		return (
			<View>
				{!this.props.showDueSoon &&
					<SearchBar
						lightTheme
						round
						clearIcon
						onChangeText={(str) => {this.setState({searchInput: str.toLowerCase()})}}
						onClearText={() => this.setState({searchInput: ''})}
						placeholder='Search'
					/>
				}
				<FlatList
					data = {getActionItems(this.props.actionItems).filter(item => item.title.toLowerCase().includes(this.state.searchInput))}
		            renderItem={({item}) => this.renderListItem(item)}
		            keyExtractor = {item => item.id}
								ItemSeparatorComponent = {() => {return(renderSeperator())}}
		            ListHeaderComponent = {this.renderHeader}
		            ListFooterComponent = {this.renderFooter}
		            refreshing = {this.props.refreshing}
		            onEndReached = {this.handleLoadMore}
		            onEndReachedThreshold = {50}
				/>
			</View>
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
	                                <Text numberOfLines={1}>{this.formatGuestNames(item.guestIds)}</Text>
	                            </View>
	                        </View>
	                        <View style={{flex: 2, flexDirection: 'row'}}>
	                            <View style={{flex:1}}>
	                                <Icon
	                                    name='location-on' />
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

    renderHeader = () => {
        return null;
    };

}

// TODO: populate guests, color and ensure that deleting guests removes from these action items.
function getActionItems(IdsToActionItems) {
    var actionItems = [];
    for (var Id in IdsToActionItems) {
    	var item = IdsToActionItems[Id];
        actionItems.push({
            title : item.title,
            guestIds: item.guestIds,
            color: getRandomColor(),
            locationStr: item.locationStr,
            id: Id,
            shiftDate: item.shiftDate
        });
    }
    return actionItems;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default ActionItemList;

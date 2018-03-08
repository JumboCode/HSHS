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
class ActionItemList_module extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: '',

		};

        this.Screen_ActionItem_view = this.Screen_ActionItem_view.bind(this);
    }

    Screen_ActionItem_view = (item) => {
        this.props.navigator.push({
            screen: 'ActionItem_view', // unique ID registered with Navigation.registerScreen
            passProps: {
                actionItemId: item.actionItemId,
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
				console.log("ERROR: formatGuestNames called despite no guestIds-- this should not happen");
    		return ("No Tagged Guests");
		}
        var formatedString = "";
    	for (id of guestIds) {
				// Prevent app from crashing when an inavlid guest is included
				if (this.props.guests[id])
    			formatedString = formatedString + this.props.guests[id].name + ", ";
		}

		// get rid of that dumb last comma and space
		formatedString = formatedString.slice(0, -2);
		return formatedString
    };

	render() {
		var actionItems = getActionItems(this.props.actionItems, this.props.selectedGuestId);
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

		return (
			<View style={{height: '100%'}}>
				{!this.props.showDueSoon && !this.props.dashboard &&
					<SearchBar
						containerStyle={{backgroundColor: 'transparent'}}
						lightTheme
						round
						clearIcon={this.state.searchInput !== ''}
						onChangeText={(str) => {this.setState({searchInput: str.toLowerCase()})}}
						onClearText={() => this.setState({searchInput: ''})}
						placeholder='Search'
					/>
				}
				<FlatList
					data = {this.props.dashboard
						? (this.props.selectedInteraction ? [this.props.actionItems[this.props.selectedInteraction]] : null)
						: getActionItems(actionItems).filter(item => item.title.toLowerCase().includes(this.state.searchInput))}
		            renderItem={({item}) => this.renderListItem(item)}
		            keyExtractor = {item => item.id}
								ItemSeparatorComponent = {() => {return(renderSeperator())}}
		            ListHeaderComponent = {this.renderHeader}
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
	                                    name='people' />
	                            </View>
	                            <View style={{flex:3, justifyContent: 'center'}}>
	                                <Text
																		style={item.guestIds ? {} : {fontStyle: 'italic'}}
																		numberOfLines={1}>
																			{item.guestIds ? this.formatGuestNames(item.guestIds) : "No Tagged Guests"}
																	</Text>
	                            </View>
	                        </View>
	                        <View style={{flex: 2, flexDirection: 'row'}}>
	                            <View style={{flex:1}}>
																		<Icon
	                                    name={'location-on'}/>
	                            </View>
	                            <View style={{flex:3, justifyContent: 'center'}}>
	                                <Text
																		style={item.locationStr ? {} : {fontStyle: 'italic'}}
																		numberOfLines={1}>
																			{item.locationStr ? item.locationStr : "No Tagged Location"}
																	</Text>
	                            </View>
	                        </View>
	                    </View>
	                } // TODO: fix that without an extra space, the last character is cut off
	                subtitleStyle = {{textAlign: 'right'}}
	                containerStyle = {{ borderBottomWidth: 0, marginLeft: 10, backgroundColor:"#F5FCFF" }}
	                onPress = {() => this.Screen_ActionItem_view(item)}
	            />
	        </View>
        )
    }

    renderHeader = () => {
        return null;
    };

}

// TODO: populate guests, color and ensure that deleting guests removes from these action items.
function getActionItems(IdsToActionItems, selectedGuestId) {
	var actionItems = [];
	if (selectedGuestId) {
		for (var Id in IdsToActionItems) {
	    	var item = IdsToActionItems[Id];
	    	if (item.guestIds && item.guestIds.includes(selectedGuestId)) {

		        actionItems.push({
		            title : item.title,
		            guestIds: item.guestIds,
		            color: item.color ? item.color : "transparent",
		            locationStr: item.locationStr,
		            id: Id,
								actionItemId: item.actionItemId,
		            shiftDate: item.shiftDate
		        });
	    	}
	    }
	} else {
	    for (var Id in IdsToActionItems) {
	    	var item = IdsToActionItems[Id];
	        actionItems.push(parseActionItem(item, Id));
	    }
	}
    return actionItems;
}

parseActionItem = (item, Id) => {
	return({
			title : item.title,
			guestIds: item.guestIds,
			color: item.color ? item.color : "transparent",
			locationStr: item.locationStr,
			id: Id,
			actionItemId: item.actionItemId,
			shiftDate: item.shiftDate
	});
}

export default ActionItemList_module;

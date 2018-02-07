// This component should be used every time guests need to be tagged.
// Props: ref gives a reference to the component for opening and closing
//        guests is the list of guests you get from redux
//        loading is the loading state from redux
//        taggedGuests is an array of guest names that have been selected
//        addGuest is a function that takes a name and adds that name to your
//          taggedGuests array
//        removeGuest is similar to addGuest
import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { List, ListItem, SearchBar, CheckBox } from "react-native-elements";
import PopupDialog, {SlideAnimation, DialogTitle, DialogButton, DefaultAnimation} from 'react-native-popup-dialog';
import { Button } from 'react-native'
import PopupDialog_hshs from "./hshs_popup"


// TODO: change the popup navigation to follow ChooseLocation

// TODO: use Ids for efficency
export default class TagGuestDialog extends Component {
    constructor(props) {
        super(props);

        // add guest names to the state for checklist
        this.state = {checked: [], results: [], search: false}

        // NOTE: One invariant is this.state.checked and this.props.taggedGuests
        // should always be the same. The information is duplicated because
        // the checks in checkboxes weren't re-rendering properly otherwise.
    };

    // calls show() fn of PopupDialog
    show(onShown: ?Function) {
        this.popupDialog.show();
    }


    renderLoading = () => {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 0,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderFooter = () => {
        return <Button
            title="Tag Guests"
            onPress={() => {
                this.popupDialog.dismiss();
            }}
        />;
    };

    render() {
        if (this.props.loading == true || this.props.guests.length <= 1) {
            return this.renderLoading();
        }
        return (
          <PopupDialog_hshs
              ref={(popupDialog) => {
                  this.popupDialog = popupDialog;
              }}
          >
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
                    <FlatList
                        data = {this.props.guests}
                        renderItem={({ item }) => (
                            <CheckBox
                                title={`${item.name}`}
                                onPress={()=>
                                {
                                    if (!this.state.checked.includes(item)) {
                                        this.setState({checked: [...this.state.checked, item]});
                                        this.props.addGuest(item);
                                    } else {
                                        let index = this.state.checked.indexOf(item)
                                        let arr = this.state.checked
                                        arr.splice(index, 1)
                                        this.setState({checked: arr})
                                        this.props.removeGuest(item);
                                    }
                                }}
                                checked={this.state.checked.includes(item)}
                            ></CheckBox>
                        )}
                        keyExtractor = {item => item.Id}
                        ListHeaderComponent = {this.renderHeader}
                        ListFooterComponent = {this.renderFooter}
                        refreshing = {this.props.refreshing}
                        onEndReached = {this.handleLoadMore}
                        onEndReachedThreshold = {50}
                        extraData={this.state}
                    />
                </List>
            </PopupDialog_hshs>
        );
    }
}

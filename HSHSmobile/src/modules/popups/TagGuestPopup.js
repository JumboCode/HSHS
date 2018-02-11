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
import Popup from "./popup"
import renderSeperator from "../UI/renderSeperator";
import renderLoader from "../UI/renderLoader";

// TODO: use Ids for efficency
export default class TagGuestDialog extends Component {
    constructor(props) {
        super(props);

        // add guest names to the state for checklist
        this.state = {checkedNow: [], checkedBefore: [], search: false}

        // NOTE: One invariant is this.state.checked and this.props.taggedGuests
        // should always be the same. The information is duplicated because
        // the checks in checkboxes weren't re-rendering properly otherwise.
    };

    // calls show() fn of PopupDialog
    show(onShown: ?Function) {
        this.Popup.show();
    }

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderContent = () => {
      return (
        <View style={{
          height: "80%",
          width: "100%",
        }}>
            <List containerStyle={{height: "100%", width: "100%"}}>
                <FlatList
                    data = {this.props.guests}
                    renderItem={({ item }) => (
                        <CheckBox
                            title={`${item.name}`}
                            onPress={()=>
                            {
                                if (!this.state.checkedNow.includes(item)) {
                                    this.setState({checkedNow: [...this.state.checkedNow, item]});
                                } else {
                                    let index = this.state.checkedNow.indexOf(item)
                                    let arr = this.state.checkedNow
                                    arr.splice(index, 1)
                                    this.setState({checkedNow: arr})
                                }
                            }}
                            checked={this.state.checkedNow.includes(item)}
                        ></CheckBox>
                    )}
                    keyExtractor = {item => item.Id}
                    ListHeaderComponent = {this.renderHeader}
                    refreshing = {this.props.refreshing}
                    onEndReached = {this.handleLoadMore}
                    onEndReachedThreshold = {50}
                    extraData={this.state}
                />
            </List>
          </View>
      );
    }

    render() {
        if (this.props.loading == true || this.props.guests.length <= 1) {
            return renderLoader();
        }
        return (
          <Popup
            title={"test title"}
            onConfirm= { () => { this.setState ( { checkedBefore: this.state.checkedNow } ); this.props.onConfirm(this.state.checkedNow)}}
            onCancel = { () => { this.setState ( { checkedNow: this.state.checkedBefore } ); }}
            ref={(popup) => {
                this.Popup = popup;
            }}
            >
            {this.renderContent()}
          </Popup>
        );
    }
}

// This component should be used every time guests need to be tagged.
// Props: ref gives a reference to the component for opening and closing
//        guests: array of guest objects with name and Id, e.g.
//                [{name: 'foo', Id: 'bar'}, {name: 'foo2', Id: 'bar2'}]
//        loading: loading state from redux
//        onConfirm: callback for the confirm button press,
//                   a function that takes the set guests as a parameter.

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
import GuestFilter from "../GuestFilter";

export default class TagGuestDialog extends Component {
    constructor(props) {
        super(props);

        // TODO:
        // Just in case things go horribly wrong
        // (e.g. a guest is deleted from firebase without disascoiating correctly from the tagged gust list)
        // we remove non existent guests from the tagging

        // This allows us to overload the Component for editting
        // e.g. pass initialGuests as a prop when editing with guests that are already tagged
        this.state = {
          checkedNow: this.props.initialGuests ? this.props.initialGuests.slice() : [],
          checkedBefore: this.props.initialGuests ? this.props.initialGuests.slice() : [],
          searchInput: '',
          age: '',
          gender: ''
        }
    };

    // calls show() fn of PopupDialog
    show(onShown: ?Function) {
        this.Popup.show();
    }

    filterGuestData = (guests) => {
      return guests.filter(item => (item.name.toLowerCase().includes(this.state.searchInput) || item.description.toLowerCase().includes(this.state.searchInput))
                                      && (this.state.age == "" ||this.state.age == item.age)
                                        && (this.state.gender == "" || this.state.gender == item.gender));
    }

    renderContent = () => {
      return (
        <View style={{
          height: "80%",
          width: "100%",
        }}>
          <SearchBar
            placeholder="Search (Ex. Phil Wang)"
            onChangeText={(str) => {this.setState({searchInput: str.toLowerCase()})}}
            onClearText={() => this.setState({searchInput: ''})}
            containerStyle={{backgroundColor: 'transparent'}}
            lightTheme
            clearIcon={this.state.searchInput !== ''}
            value={this.state.searchInput}
          />
          <GuestFilter
              filterOptions={{age: {options: ['Old', 'Young', 'Middle'], color: 'rgba(119, 11, 22, 1)'}, gender: {options: ['F', 'M', "O"], color: '#4E84C4'}}}
              selectedFilters={(() => {
                  const {checkedNow, checkedBefore, searchInput, ...filterInfo} = this.state;
                  return filterInfo;
              })()}
              onChange={newSelected => this.setState(newSelected)}
          />
          <FlatList
              data = {this.filterGuestData(this.props.guests) }
              renderItem={({ item }) => (
                  <CheckBox
                      title={`${item.name}`}
                      onPress={()=>
                      {
                          if (!this.state.checkedNow.includes(item.Id)) {
                              this.setState({checkedNow: [...this.state.checkedNow, item.Id]});
                          } else {
                              let index = this.state.checkedNow.indexOf(item.Id)
                              let arr = this.state.checkedNow
                              arr.splice(index, 1)
                              this.setState({checkedNow: arr})
                          }
                      }}
                      checked={this.state.checkedNow.includes(item.Id)}
                  ></CheckBox>
              )}
              keyExtractor = {item => item.Id}
              refreshing = {this.props.refreshing}
              onEndReached = {this.handleLoadMore}
              onEndReachedThreshold = {50}
              extraData={this.state}
          />
          </View>
      );
    }

    render() {
        if (this.props.loading == true && this.props.guests) {
            return renderLoader();
        }
        return (
          <Popup
            title={"Choose guests"}
            onConfirm= { () => { this.setState ( { checkedBefore: this.state.checkedNow.slice() } ); this.props.onConfirm(this.state.checkedNow)}}
            onCancel = { () => { this.setState ( { checkedNow: this.state.checkedBefore.slice() } );}}
            ref={(popup) => {
                this.Popup = popup;
            }}
            >
            {this.renderContent()}
          </Popup>
        );
    }
}

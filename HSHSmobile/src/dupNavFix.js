import React, { Component } from 'react';

function preventNavStackDuplicate(Component){
    return class PreventNavStackDuplicate extends React.Component {

        componentDidMount(){
             this.props.navigator.setOnNavigatorEvent(event => {
                 if (event.id === 'didDisappear') {
                    this._navigated = null
                } else if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
                    switch (event.id) {
                        case 'new_actionItem':
                            this.Screen_ActionItem_new();
                            break;
                        case 'edit_actionItem':
                            this.Screen_ActionItem_edit();
                            break;
                    }
                }
             })
        }

        _navigated = null

        navigateTo = screenOptions => {
            if (!this._navigated) {
                this.props.navigator.push(screenOptions)
            }

            this._navigated = true
        }

        Screen_ActionItem_new = () => {
            this.navigateTo({
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
        };

        Screen_ActionItem_edit = () => {

        // TODO: geeze why is this longitude latitude and other places lat lng? cause google maps api sucks. please let's fix this later.
          var coords = this.props.actionItems[this.props.actionItemId].locationCoord ? {
            longitude: this.props.actionItems[this.props.actionItemId].locationCoord.lng,
            latitude: this.props.actionItems[this.props.actionItemId].locationCoord.lat,
          } : null;

          this.navigateTo({

              title: 'Edit Action Item',
              screen: 'ActionItem_edit', // unique ID registered with Navigation.registerScreen
              // TODO: consider to pass the id of this action item, edit screen will pull all the data there.
              passProps: {
                actionItemId: this.props.actionItemId,
                title: this.props.actionItems[this.props.actionItemId].title,

                actionItemId: this.props.actionItems[this.props.actionItemId].actionItemId,

                // make a copy
                taggedGuests: this.props.actionItems[this.props.actionItemId].guestIds ? this.props.actionItems[this.props.actionItemId].guestIds.slice() : null,

                locationCoord: coords,
                locationStr: this.props.actionItems[this.props.actionItemId].locationStr,
                selectedDate: this.props.actionItems[this.props.actionItemId].shiftDate,
                dateName: this.props.actionItems[this.props.actionItemId].dateName,
                description: this.props.actionItems[this.props.actionItemId].description,
                color: this.props.actionItems[this.props.actionItemId].color,
              }, // Object that will be passed as props to the pushed screen (optional)

              animated: true, // does the push have transition animation or does it happen immediately (optional)
              animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
              backButtonHidden: false, // hide the back button altogether (optional)
              navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
              navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
          })
      };

        render(){
            return <Component {...this.props} navigateTo = {this.navigateTo} />
        }
    }
}

export default preventNavStackDuplicate;

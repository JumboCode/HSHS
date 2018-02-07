/*
USAGE:

<PopupDialog_hshs
    ref={(popupDialog) => {
        this.popupDialog = popupDialog;
    }}

    // optional for a title (similar for a footer): 
    dialogTitle={<DialogTitle title={"Drag Marker to set a Location:\n" + this.state.address }/>}
>
*/

import React, {Component} from 'react';
import PopupDialog, {SlideAnimation, DialogTitle, DialogButton, DefaultAnimation} from 'react-native-popup-dialog';
import {connect} from 'react-redux';

const Timestamp = require('react-timestamp');

export default class PopupDialog_hshs extends PopupDialog {
    constructor(props) {
        super(props);
    }
}

PopupDialog_hshs.defaultProps = {
  zIndex: 2,
  dialogStyle: { position: 'absolute', top: 40, width: '100%', height: "60%" }
};

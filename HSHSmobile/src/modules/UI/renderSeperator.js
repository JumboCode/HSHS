import {
    View,
} from 'react-native';
import React, { Component } from 'react';


// TODO: really, this should be an extension of a component, not a function to render one
export default renderSeparator = (w = "100%", h = 1, color = "#CED0CE", marginL = "0%") => {
    return (
        <View
            style={{
                height: h,
                width: w,
                backgroundColor: color,
                marginLeft: marginL
            }}
        />
    );
};
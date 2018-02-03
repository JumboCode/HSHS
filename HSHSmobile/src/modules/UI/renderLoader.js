import {
    View,
} from 'react-native';
import React, { Component } from 'react';
import {
    ActivityIndicator
} from 'react-native';

// TODO: really, this should be an extension of a component, not a function to render one
export default renderLoader = () => {
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
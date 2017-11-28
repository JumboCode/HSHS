/* GuestProfile */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from 'react-native';
import { List, ListItem } from "react-native-elements";
import nodeEmoji from 'node-emoji';
import {connect} from 'react-redux';

const Timestamp = require('react-timestamp');

function mapStateToProps(state, ownProps) {
    return {
        item: null, //state.actionItems[ownProps.id],
        loading: state.loading,
    };
}


class TodoListItem extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <View>
                <Text>
                    test
                </Text>
            </View>
        );
    }
}

export default connect(mapStateToProps)(TodoListItem);

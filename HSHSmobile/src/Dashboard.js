import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import {connect} from 'react-redux';
import {getGuests} from './redux/actions.js';

const Icon = require('react-native-vector-icons/Ionicons');

function mapStateToProps(state, ownProps) {
    var guests = guestObjectToArray(state.guests);
    return {
        data: guests,
        loading: state.loading
    };
}

function mapDispatchToProps(dispath, ownProps) {
    return {
        getGuests: getGuests
    };
}

function guestObjectToArray(IdsToGuests) {
    var guestList = []
    for (var Id in IdsToGuests) {
        guestList.push({
            "Id" : Id,
            "name" : IdsToGuests[Id].name,
            "lastInteractionTimestamp" : daysSinceInteraction(IdsToGuests[Id].interactions),
        });
    }
    return guestList;
}

function daysSinceInteraction(interactions) {
    if (interactions == null) {
        return "No recorded interactions ";
    } else {
        return "X days since last interaction ";
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

        this.state = {
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
        }
    };

    componentDidMount() {
        this.makeRemoteRequest();
    };

    makeRemoteRequest = () => {
        this.props.getGuests();
    };

    componentWillUpdate(nextProps, nextState) {
        console.log(this.props.data);
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return null;
        //return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

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

    render() {
        console.log(this.props.data);
        return (
            <Text>
                Dashboard
             </Text>
        );
    }
}

const styles = StyleSheet.create({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, {Component} from 'react';
import {FlatList, View, Text, Linking} from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import {connect} from 'react-redux';
import renderLoader from "../../modules/UI/renderLoader";
import dupNavFix from '../../dupNavFix';

class Resources_search extends Component {
    constructor(props) {
        super(props);
        this.state = {searchInput: this.props.searchInit, loaded: false};
    }

    goToURL(url) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL('https://' + url);
        } else {
          console.log('Don\'t know how to open URI: ' + url);
        }
      });
    }

    renderListItem(link) {
        return (
            <ListItem
                title = {link.item.name}
                subtitle = {link.item.category}
                onPress = {() => {Linking.openURL("https://" + link.item.link)}}
            />
        );
    }

    renderAccordionContent(link) {
        return (
            <View>
                <View>
                    <Text>{link.description}</Text>
                </View>
                <View>
                    <Text
                        onPress={() => {this.goToURL(link.link)}}
                    >
                        {link.link}
                    </Text>
                </View>
            </View>
        );
    }

    renderSearchBar = () => {
        if(this.props.searchInit != "") {
            return(
                <View/>
            );
        } else {
            return(
                <SearchBar
                    lightTheme
                    round
                    clearIcon = {this.state.searchInput !== ''}
                    onChangeText = {(str) => {this.setState({searchInput: str.toLowerCase()})}}
                    onClearText = {() => this.setState({searchInput: ''})}
                    value={this.state.searchInput}
                    placeholder = "Search"
                />
            );
        }
    }

    _keyExtractor = (link) => {
      return link.name.toLowerCase();
    }

    render() {
        return (
            <View style = {{backgroundColor : "#F7F7F7", height : "100%"}}>
                {this.renderSearchBar()}
                <FlatList
                    data = {this.props.linkData.filter(
                        (link) => {
                            return(
                                link.category.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
                                link.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
                            )
                        }
                    )}
                    renderItem = {(link) => this.renderListItem(link)}
                    keyExtractor = {(link) => this._keyExtractor(link)}
                />
            </View>
        );
    }
}

/*
<Accordion
    sections = {this.props.linkData.filter(
        (link) => {
            return(
                link.category.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
                link.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
            )
        }
    )}
    renderHeader = {(link) => {this.renderListItem(link)}}
    renderContent = {(link) => {this.renderAccordionContent(link)}}
/>
*/

export default dupNavFix(Resources_search)

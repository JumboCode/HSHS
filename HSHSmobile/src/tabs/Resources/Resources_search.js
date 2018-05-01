import React, {Component} from 'react';
import {FlatList, View, Text, Linking, StyleSheet} from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import {connect} from 'react-redux';
import renderLoader from "../../modules/UI/renderLoader";
import dupNavFix from '../../dupNavFix';
const Icon = require('react-native-vector-icons/Ionicons');

class Resources_search extends Component {
    constructor(props) {
        super(props);
        this.state = {searchInput: this.props.searchInit, loaded: false};
    }

    goToURL(url) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
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

    renderAccordionHeader(link) {
        return (
            <View style={{backgroundColor: "white"}}>
                <ListItem
                    title = {link.name}
                    subtitle = {link.category}
                    rightIcon={{name: "chevron-down", type: "material-community"}}
                />
            </View>
        )
    }

    renderPhones = (title, number) => {
      return (
        <View key={number[0]}>
          <Text>{title}:</Text>
          <Text onPress={() => {this.goToURL("tel:1" + number[0])}}style={styles.link}>{number[1]}</Text>
        </View>
      );
    }

    renderAccordionContent(link) {
        let website = (link.link == undefined)    ? <View></View> : (<Text style={styles.link} onPress={() => {this.goToURL(link.link)}}>See Website</Text>);
        let phones  = (link.phone == undefined)   ? <View></View> : Object.keys(link.phone).map(title => this.renderPhones(title, link.phone[title]));
        let address = (link.address == undefined) ? <View></View> : (<Text>{link.address}</Text>)
        return (
            <View style={{paddingTop: 15, paddingBottom: 15, paddingHorizontal: 5, flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start", borderBottomColor: "#D3D3D3", borderBottomWidth: 1}}>
              <View style={{width: "50%", }}>
                <View style={styles.headerContainer}>
                  <Text style={styles.contentHeader}>Contact Information</Text>
                </View>
                <View style={{marginTop: 5}}>
                  {website}
                  {phones}
                </View>
              </View>
              <View style={{width: "40%"}}>
                <View style={styles.headerContainer}>
                  <Text style={styles.contentHeader}>Address</Text>
                </View>
                <View style={{marginTop: 5}}>
                  {address}
                </View>
              </View>
            </View>
        );
    }

/*
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
*/

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
                <Accordion
                    sections = {this.props.linkData.filter(
                        (link) => {
                            return(
                                link.category.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
                                link.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
                            )
                        }
                    )}
                    renderHeader = {(link) => this.renderAccordionHeader(link)}
                    renderContent = {(link) => this.renderAccordionContent(link)}
                    underlayColor = "white"
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
const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    paddingBottom: 2,
    paddingRight: '5%'
  },

  contentHeader: {
    fontSize: 16,
    color: "#808080",
    textShadowColor: '#D3D3D3',
    textShadowRadius: 1,
    textShadowOffset: {width: 2, height: 2}
  },
  link: {
    color: "#0080FF",
  }

});

export default dupNavFix(Resources_search)

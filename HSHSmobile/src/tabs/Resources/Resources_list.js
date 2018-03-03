// Starter for the Resource page
//

import React, { Component } from 'react';
import {
    Linking,
    Text,
    View,
    StyleSheet,
    FlatList,
    Button
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';

const IonIcon = require('react-native-vector-icons/Ionicons');

// Resource data JSON spec-
// [{
//    categoryName: "Emergency Shelters",
//    links: [
//      {
//        name: "Dry Men's shelter",
//        description: "dummy information about link",
//        link: "www.fake.com/fake"
//      },
//    ...]
// }, {}, ...]
//


class Resources_list extends Component {
    constructor(props) {
        super(props);
        this.state = {searchInput: '', loaded: false};
    }

    _renderHeader() {
      return;
    }

    _goToURL(url) {
      console.log(url);
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL('https://' + url);
        } else {
          console.log('Don\'t know how to open URI: ' + url);
        }
      });
    }

    _renderAccordionTitle (content) {
      return (
        <View style={styles.accordionTitle}>
          <Text style={styles.title}>{content.name}</Text>

          <Icon
            name = "md-arrow-dropdown"
            size = {30}
            color = '#770B16'
            style = {{marginRight: 15}}
            />
        </View>
      );
    }

    _renderAccordionContent (content) {
      let link = content.link;
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 5}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{width: 180}}>{content.description}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{width: 180, color: 'blue', textDecorationLine: 'underline'}}
                onPress={() => {this._goToURL(link)}}>
              {link}
            </Text>
          </View>
        </View>
      );
    }

    //                easing="easeOutCubic"
    render() {

        return (
          <View style = {{backgroundColor : "#F7F7F7", height : "100%"}}>
    				<SearchBar
    					lightTheme
    					round
    					clearIcon={this.state.searchInput !== ''}
    					onChangeText={(str) => {this.setState({searchInput: str.toLowerCase()})}}
    					onClearText={() => this.setState({searchInput: ''})}
    					placeholder='Search'
    				/>
            <View>
              <Accordion
                sections={this.props.linkData.links.filter(item => item.name.toLowerCase().includes(this.state.searchInput))}
                renderHeader={this._renderAccordionTitle.bind(this)}
                renderContent={this._renderAccordionContent.bind(this)}
              />
            </View>
    	  </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    accordionTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1.5,
      borderRadius: 10,
      borderStyle: 'dotted',
      borderColor: '#770B16',
      marginTop: 3,
      marginBottom: 3,
      marginHorizontal: 2,
    },

    title: {
      fontSize: 18,
      marginTop: 5,
      marginBottom: 5,
      marginHorizontal: 10,
    },


});

export default Resources_list

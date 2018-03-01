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
import Accordion from 'react-native-collapsible/Accordion';


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
        this.state = {searchInput: ''};
        this.linkData = {categoryName: "Emergency Shelters",
                          links: [
                              {name: "Dry Men's shelter",description: "dummy information about link",
                                  link: "www.google.com"},
                              {name: "Dry Womens's shelter",description: "dummy information about link",
                                  link: "www.fake.com/fake"},
                              {name: "Late Night Men's shelter",description: "dummy information about link",
                                  link: "www.fake.com/fake"},
                              {name: "Late Night Women's shelter",description: "dummy information about link",
                                  link: "www.fake.com/fake"},
                                  ]
                        };
    }

    _renderHeader() {
      return;
    }

    _renderAccordionTitle (content) {
      return (
        <View style={styles.accordionTitle}>
          <Text style={styles.title}>{content.name}</Text>
        </View>
      );
    }

    _goToURL(url) {
      console.log(url);
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL('http://' + url);
        } else {
          console.log('Don\'t know how to open URI: ' + url);
        }
      });
    }

    _renderAccordionContent (content) {
      let link = content.link;
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 5}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{width: 180}}>{content.description}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{width: 180}}
                onPress={() => {this._goToURL(link)}}>
              {link}
            </Text>
          </View>
        </View>
      );
    }

    render() {
        return (
          <View>
            <View style={styles.container}>
              <Text style={styles.welcome}>{this.linkData.categoryName}</Text>
            </View>
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
                sections={this.linkData.links.filter(item => item.name.toLowerCase().includes(this.state.searchInput))}
                renderHeader={this._renderAccordionTitle.bind(this)}
                renderContent={this._renderAccordionContent.bind(this)}
                easing="easeOutCubic"
              />
            </View>
    			</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    accordionTitle: {
      borderWidth: 1,
      borderColor: '#000000',
    },

    title: {
      fontSize: 18,
      marginTop: 5,
      marginBottom: 5,
      marginHorizontal: 5,
    },

    accordionContent: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },

});

export default Resources_list

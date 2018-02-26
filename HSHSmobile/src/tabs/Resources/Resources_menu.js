import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {connect} from 'react-redux';
import renderLoader from "../../modules/UI/renderLoader";


class Resources_menu extends Component {
    constructor(props) {
        super(props);
        console.log("here");

        this.linkData = [{categoryName: "Emergency Shelters",
                          links: [{name: "Dry Men's shelter",description: "dummy information about link",
                                  link: "www.fake.com/fake"}]}];
    }

    renderHeader = () => {
      return (
        <View>
          <Text style={styles.title}> HSHS </Text>
          <Text style={styles.address}>Harvard Homeless Shelter</Text>
          <Text style={styles.address}>66 Winthrop Street</Text>
          <Text style={styles.address}>Cambridge, MA, 02138</Text>
          <Text style={styles.phoneNum}>875-364-2228</Text>
        </View>
      );
    }

    renderMenuButtons = () => {
    }


    /* TODO: add {({linkData}) => this._renderMenuButtons(linkData)}*/
    render() {
        /*if (this.props.loading == true)
            return renderLoader();
        */
        return (
          <View>
              {this.renderHeader()}
              {this.renderMenuButtons()}
          </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
        marginBottom: 10,
        marginBottom: 10,
    },

    address: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000000',
    },

    phoneNum: {
      fontSize: 20,
      textAlign: 'center',
      color: '#000000',
      marginTop: 10,
      marginBottom: 10,
    },

    container: {
      flex: 1,
      width: 300,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },

    buttons: {
        flex: 1,
        borderColor: "#000",
        width: 100,
        flexWrap: 'wrap',
        justifyContent: "center",
        borderWidth: 2,
        margin: 5
    }
});

export default Resources_menu

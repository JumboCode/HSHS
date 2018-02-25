import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import renderLoader from "../../modules/UI/renderLoader";

class Resources_menu extends Component {
    constructor(props) {
        super(props);
        console.log("here");

        this.linkData = [
            {categoryName: "Emergency Shelters",
                links: [
                    {name: "Dry Men's shelter",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Dry Womens's shelter",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Late Night Men's shelter",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Late Night Women's shelter",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                ]
            },
            {categoryName: "Permanent Housing",
                links: [
                    {name: "Furniture",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Market Rate Appartment",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Private Subsidized Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Public Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                ]
            },
            {categoryName: "Employment",
                links: [
                    {name: "Furniture",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Market Rate Appartment",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Private Subsidized Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Public Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                ]
            },
            {categoryName: "Drop in Centers",
                links: [
                    {name: "Furniture",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Market Rate Appartment",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Private Subsidized Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Public Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                ]
            },
            {categoryName: "Food Resources",
                links: [
                    {name: "Furniture",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Market Rate Appartment",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Private Subsidized Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                    {name: "Public Housing",description: "dummy information about link",
                        link: "www.fake.com/fake"},
                ]
            },
            {"categoryName": "1"},
            {"categoryName": "2"},
            {"categoryName": "3"},
            {"categoryName": "4"},
            {"categoryName": "5"},
            {"categoryName": "6"},
            {"categoryName": "7"},
            {"categoryName": "8"},
            {"categoryName": "9"},
            {"categoryName": "10"},
            {"categoryName": "11"},
        ];
        this.cats = ["Shelters", "Employment", "Drop in Centers", "Food Resources", "Housing", "Healthcare", "Clothing", "Transportation"];
    }

    renderHeader = () => {
      return (
        <View style={styles.header}>
          <Text style={styles.title}>HSHS</Text>
          <Text style={styles.address}>Harvard Homeless Shelter</Text>
          <Text style={styles.address}>66 Winthrop Street</Text>
          <Text style={styles.address}>Cambridge, MA, 02138</Text>
          <Text style={styles.phoneNum}>875-364-2228</Text>
        </View>
      );
    };

    /*
    (elem) => this.renderMenuButton(elem)
     */

    renderMenuButtons = () => {
        const cat_buttons = this.linkData.map((category, key) => {
            return (
                <View key={key} style={styles.button_container}>
                    <TouchableOpacity style={{flex: 1, backgroundColor: '#DDDDDD'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{textAlign: "center", fontSize: 10}}>
                                {category.categoryName.split(" ").join("\n")}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        });
        return (
          <View style={styles.buttons}>
              {cat_buttons}
          </View>
        );
    };


    /* TODO: add {({linkData}) => this._renderMenuButtons(linkData)}*/
    render(){
        /*if (this.props.loading == true)
            return renderLoader();
        */
        return (
          <ScrollView contentContainerStyle={styles.container}>
              {this.renderHeader()}
              {this.renderMenuButtons()}
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    header: {
        flex: 1,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
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

    buttons: {
        flex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
    },

    button_container: {
        width: "27%",
        height: "17%",
        margin: "2.5%",
    }
});

export default Resources_menu

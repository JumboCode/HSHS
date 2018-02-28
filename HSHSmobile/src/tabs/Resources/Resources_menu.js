import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TouchableHighlight,
    Linking,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import renderLoader from "../../modules/UI/renderLoader";

class Resources_menu extends Component {
    constructor(props) {
        super(props);

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
            {"categoryName": null},
            {"categoryName": null}
        ];

    }

    renderHeader = () => {
        return (
            <View style = {styles.headerContainer}>
                <Image
                      source = {require("./hshs_monochrome.jpg")}
                      style = {styles.headerImage}>
                      <View>
                            <Text style={styles.title}>HSHS</Text>
                            <Text style={styles.address}>Harvard Square Homeless Shelter</Text>
                            <Text style={styles.address}>66 Winthrop Street</Text>
                            <Text style={styles.address}>Cambridge, MA, 02138</Text>
                      </View>
                  </Image>
                  <View style = {{flex: 1, margin: "5%"}}>
                      <Button
                        onPress = {() => Linking.openURL("tel:1-875-364-2228")}
                        title = {"Call : 875-364-2228"}
                        color = {"rgba(119, 11, 22, 1)"}
                        accessibilityLabel = {"Call : 875-364-2228"}
                        />
                  </View>
            </View>
        );
    };

// <Text style={styles.phoneNum} onPress = {() => Linking.openURL("tel:1-875-364-2228")}>875-364-2228</Text>

    renderButton = (category, key) => {
        if(category.categoryName === null) {
            return (
                <View style = {styles.buttonContainer}/>
            );
        } else {
            return(
                <View style = {styles.buttonContainer}>
                    <TouchableHighlight
                        style = {styles.button}
                        onPress = {() => {let one = 1}}
                        underlayColor = {"rgba(119, 11, 22, .75)"}
                    >
                        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style = {{textAlign: "center", fontSize: 10}}>
                                {category.categoryName.split(" ").join("\n")}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }
    };

    render(){
        /*if (this.props.loading == true)
            return renderLoader();
        */
        return(
            <FlatList
              ListHeaderComponent={this.renderHeader}
              data = {this.linkData}
              numColumns = {3}
              renderItem = {({item, key}) => this.renderButton(item, key)}
              keyExtractor = {(item, index) => (item.id + index)}
              columnWrapperStyle = {{margin: "1%"}}
            />
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height : 300,
    },

    headerImage: {
        flex : 7,
        resizeMode : "cover",
        width : "100%",
        height : "100%",

        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        //color: '#000000',
        color: "#FFF"
    },

    address: {
        fontSize: 16,
        textAlign: 'center',
        //color: '#000000',
        color: "#FFF"
    },

    phoneNum: {
      fontSize: 20,
      textAlign: 'center',
      color: '#000000',
      marginTop: 10,
      marginBottom: 10,
    },

    buttonContainer: {
        flex: 1,
        width: 110,
        height: 110,
        marginLeft: "1%",
        marginRight: "1%",
        borderStyle: "solid",
    },

    button: {
        flex: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
    }
});

export default Resources_menu

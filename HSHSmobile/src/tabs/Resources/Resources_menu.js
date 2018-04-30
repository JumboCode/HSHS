import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TouchableHighlight,
    Linking,
    Image,
    ImageBackground,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {connect} from 'react-redux';
import renderLoader from "../../modules/UI/renderLoader";
import dupNavFix from '../../dupNavFix';

const Icon = require('react-native-vector-icons/Ionicons');

class Resources_menu extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.catIcons =
          {"Emergency Shelters" : "tent", "Transportation" : "train", "Crisis Hotlines" : "lifebuoy",
           "Domestic Violence" : "home", "Housing" : "home", "Employment" : "worker",
           "Food Resources" : "food", "Public Benefits" : "domain", "Drop-in Centers" : "home",
           "Clothing" : "tshirt-crew", "Drop-in Laundry" : "washing-machine", "Education" : "school",
           "Healthcare" : "hospital", "Identification" : "account-card-details", "Legal Services" : "briefcase",
           "Mailing" : "email", "Miscellaneous" : "star", "Phones & Voicemail" : "phone",
           "Temporary Financial Assistance" : "currency-usd", "Veteran Services" : "home-heart", "Work Contract" : "worker"};
        this.linkData = [
            {name: "Dry Men's shelter",description: "dummy information about link",
                link: "www.google.com", category: "Emergency Shelters"},
            {name: "Dry Womens's shelter",description: "dummy information about link",
                link: "www.fake.com/fake", category: "Emergency Shelters"},
            {name: "Late Night Men's shelter",description: "dummy information about link",
                link: "www.fake.com/fake", category: "Emergency Shelters"},
            {name: "Late Night Women's shelter",description: "dummy information about link",
                link: "www.fake.com/fake", category: "Emergency Shelters"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Transportation"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Crisis Hotlines"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Domestic Violence"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Housing"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Employment"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Food Resources"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Public Benefits"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Drop-in Centers"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Clothing"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Drop-in Laundry"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Education"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Healthcare"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Identification"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Legal Services"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Mailing"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Miscellaneous"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Phones & Voicemail"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Temporary Financial Assistance"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Veteran Services"},
            {name: "DUMMY", description: "dummy info about link",
                link: "https://google.com", category: "Work Contract"},


        ];
        this.categoriesMain = ["Emergency Shelters", "Transportation",
                            "Crisis Hotline", "Domestic Violence",
                            "Housing", "Employment", "Food Resources",
                            "Public Benefits", "Drop-in Centers"]
        this.state = {searchInput: '', loaded: false};
    }

    componentDidMount() {
        Icon.getImageSource('ios-search', 36).then((add) => {
            this.props.navigator.setButtons({
                rightButtons: [
                    { id: 'searchResources', icon: add },
                ]
            });
        });
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'searchResources') { // this is the same id field from the static navigatorButtons definition
                this.screenResourcesSearch("");
            }
        }
    };

    screenResourcesSearch = (catString) => {
        this.props.navigateTo({
            title : catString,
            screen : "Resources_search",
            passProps : {
                linkData : this.linkData,
                categories : this.categoriesMain,
                searchInit : catString,
                catIcons : this.catIcons
            },
            animated : true,
            animationType : 'slide-horizontal',
            backButtonHidden : false,
            navigatorStyle : {},
            navigatorButtons : {},
        });
    };

    renderHeader = () => {
        return (
            <View style = {styles.headerContainer}>
                <ImageBackground
                      source = {require("./hshs_monochrome.jpg")}
                      style = {styles.headerImage}>
                      <View style={{backgroundColor: 'rgba(0, 0, 0, .3)', width: "100%"}}>
                          <View style={{marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, width: "100%"}}>
                            <Text style={styles.address}>Harvard Square Homeless Shelter</Text>
                            <Text style={styles.address}>66 Winthrop Street</Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.lastAddress}>Cambridge, MA, 02138</Text>
                                <Text style={styles.phoneNum} onPress = {() => Linking.openURL("tel:1-857-364-2228")}>857-364-2228</Text>
                            </View>
                          </View>
                      </View>
                </ImageBackground>
            </View>
        );
    };

    renderButton = (category) => {
        return(
            <View style = {styles.buttonContainer}>
                <TouchableHighlight
                    style = {styles.button}
                    onPress = {() => (this.screenResourcesSearch(category))}
                    underlayColor = {"rgba(119, 11, 22, .75)"}
                >
                    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style = {{textAlign: "center", fontSize: 10}}>
                            {category.split(" ").join("\n")}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };

    renderButtons = () => {
        return(
            <View style = {{flexDirection: "column", alignItems : "center", height: "65%", marginTop: "10%"}}>
                <View style = {styles.buttonsContainer}>
                    {this.renderButton(this.categoriesMain[0])}
                    {this.renderButton(this.categoriesMain[1])}
                    {this.renderButton(this.categoriesMain[2])}
                    {this.renderButton(this.categoriesMain[3])}
                    {this.renderButton(this.categoriesMain[4])}
                    {this.renderButton(this.categoriesMain[5])}
                    {this.renderButton(this.categoriesMain[6])}
                    {this.renderButton(this.categoriesMain[7])}
                    {this.renderButton(this.categoriesMain[8])}
                </View>
            </View>
        );
    }

    render(){
        return(
            <View>
                {this.renderHeader()}
                {this.renderButtons()}
            </View>
        );
    }
}

//{this.categoriesMain.map((elem) => {this.renderButton(elem)})}

const styles = StyleSheet.create({
    headerContainer: {
        height: "35%",
        //height : 300,
    },

    headerImage: {
        flex : 7,
        width : "100%",
        height : "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        //color: '#000000',
        color: "#FFF",
        marginTop: 5,
        marginBottom: 5
    },

    address: {
        fontSize: 16,
        textAlign: 'left',
        //color: '#000000',
        color: "#FFF",
        margin: 3,
    },

    lastAddress: {
        fontSize: 16,
        textAlign: 'left',
        //color: '#000000',
        color: "#FFF",
        margin: 3,
        flex: 1,
    },

    phoneNum: {
      fontSize: 16,
      textAlign: 'right',
      color: '#0dd5fc',
      margin: 3,
      marginRight: "10%",
      flex: 1,
    },

    buttonsContainer: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },

    buttonContainer: {
        //flex: 1,
        width: "27%",
        height: "20%",
        marginTop: "2%",
        marginBottom: "2%",
        marginLeft: "2%",
        marginRight: "2%",
        borderStyle: "solid",
    },

    button: {
        flex: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
    }
});

export default dupNavFix(Resources_menu)

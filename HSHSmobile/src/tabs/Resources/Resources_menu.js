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
          {"Emergency Shelters" : "tent", "Transportation" : "train", "Crisis Hotlines" : "microphone",
           "Domestic Violence" : "home", "Housing" : "home", "Employment" : "worker",
           "Food Resources" : "food", "Public Benefits" : "domain", "Drop-in Centers" : "home",
           "Clothing" : "tshirt-crew", "Drop-in Laundry" : "washing-machine", "Education" : "school",
           "Healthcare" : "hospital", "Identification" : "account-card-details", "Legal Services" : "briefcase",
           "Mailing" : "email", "Miscellaneous" : "star", "Phones & Voicemail" : "phone",
           "Temporary Financial Assistance" : "currency-usd", "Veteran Services" : "home-heart", "Work Contract" : "worker"};

        this.linkData = [
          {category: "Emergency Shelters", name: "Salvation Army (Dry, Men)",
          address: "402 Massachusetts Avenue, Cambridge MA, 02138", phone: {"Phone": [6175473400, "(617) 547-3400 (Dial 1 for men's beds)"]}},

          {category: "Emergency Shelters", name: "Cambridge Winter Warming Shelter",
          address: "806 Massachusetts Avenue, Cambridge MA, 02139", link: "https://www.cambridgema.gov/Services/winterwarmingcenter"},

          {category: "Emergency Shelters", name: "CASPAR (Wet)",
          address: "240 Albany Street, Cambridge, MA, 02139", link: "http://www.casparinc.org/", phone: {"Phone": [6176610600, "(617) 661-0600 (Dial 10)"]}},

          {category: "Emergency Shelters", name: "Pine Street Inn (Wet)", address: "444 Harrison Avenue, Boston MA, 02118",
          link: "http://www.pinestreetinn.org/our_programs/shelter/obtaining_services", phone: {"Phone": [6178929100, "(617) 892-9100 (Dial 0)"]}},

          {category: "Emergency Shelters", name: "Y2Y (Damp, Youth)", address: "1 Church Street (Middle Entrance), Cambridge MA, 02138",
          link: "https://www.y2yharvardsquare.org/", phone: {"Phone": [6178640795, "(617) 864-0795"]}},

          {category: "Housing", name: "Cambridge Multi-Service Center", address: "362 Green Street, Cambridge MA, 02139",
          link: "http://www.cambridgema.gov/DHSP/programsforadults/cambridgemultiservicecenter", phone: {"Phone": [6173496340, "(617) 349-6340"]}},

          {category: "Housing", name: "C-CAN", address: "362 Green Street, Cambridge MA, 02139",
          link: "http://cambridgecoc.org/cambridgeCAN/", phone: {"Phone": [6173497715, "(617) 349-7715"]}},

          {category: "Transportation", name: "MBTA Reduced Fares", link: "https://www.mbta.com/fares/reduced"},

          {category: "Transportation", name: "CASPAR Emergency Van Service", phone: {"Phone": [6176610600, "(617) 661-0600"]}},

          {category: "Crisis Hotlines", name: "Samaritans (Suicide Prevention)",
          phone: {"Teen Statewide Hotline": [8778704673, "(877) 870-4673"], "Boston Hotline": [6175362460, "(617) 536-2460"]}},

          {category: "Crisis Hotlines", name: "Trevor Project (LGBT Youth Suicide Prevention)", phone: {"Phone": [8664887386, "(866) 488-7386"]}},

          {category: "Crisis Hotlines", name: "MA Substance Abuse Helpline", phone: {"Phone": [8003275050, "(800) 327-5050"]}},

          {category: "Domestic Violence", name: "Boston Area Rape Crisis Center", address: "99 Bishop Allen Drive, Cambridge MA, 02139",
          phone: {"Hotline": [8008418371, "(800) 841-8371"], "Phone": [6174928306, "(617) 492-8306"], "TTY": [6174926434, "(617) 492-6434"]}},

          {category: "Domestic Violence", name: "Safelink",
          phone: {"Hotline": [8777852020, "(877) 785-2020"], "TTY": [8775212601, "(877) 521-2601"]}},

          {category: "Employment", name: "Massachusetts Rehabilitation Coalition", address: "27 Wormwood Street, Boston MA, 02210",
          link: "http://cambridgecoc.org/cambridgeCAN/", phone: {"Main Information": [8002456543, "(800) 245-6543"]}},

          {category: "Employment", name: "Career Collaborative", address: "77 Summer Street, 11th Floor, Boston MA, 02111",
          phone: {"Phone": [6174246616, "(617) 424-6616"]}},

          {category: "Food Resources", name: "SNAP/Food Stamps", link: "http://www.cambridgepublichealth.org/services/school-health/how_to_apply_for_food_stamps.php"},

          {category: "Food Resources", name: "Lunch at Salvation Army", address: "402 Massachusetts Avenue, Cambridge MA, 02138",
          phone: {"Phone": [6175473400, "(617) 547-3400"]}},

          {category: "Public Benefits", name: "Mass.gov", link: "https://www.mass.gov/economic-assistance-cash-benefits"},

          {category: "Public Benefits", name: "Transitional Aid to Families with Dependent Children (TAFDC)", link: "https://www.mass.gov/service-details/check-tafdc-eligibility-and-how-to-apply"},

          {category: "Public Benefits", name: "Emergency Aid to the Elderly, Disabled, and Children (EAEDC)", link: "https://www.mass.gov/service-details/check-eaedc-eligibility-and-how-to-apply"},
        ];

        this.categoriesMain = ["Emergency Shelters", "Housing", "Transportation",
                            "Crisis Hotline", "Domestic Violence",
                             "Employment", "Food Resources",
                            "Public Benefits", "Others"]
        this.state = {searchInput: '', loaded: false};
    }

    componentDidMount() {
        Icon.getImageSource('ios-search-outline', 36).then((add) => {
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

    goToURL(url) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('Don\'t know how to open URI: ' + url);
        }
      });
    }

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
                                <Text style={styles.phoneNum} onPress = {() => this.goToURL("tel:18573642228")}>857-364-2228</Text>
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

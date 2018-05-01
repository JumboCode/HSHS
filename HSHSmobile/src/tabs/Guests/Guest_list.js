import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Button,
    TouchableHighlight,
    Animated,
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import {connect} from 'react-redux';
import renderSeperator from "../../modules/UI/renderSeperator";
import renderLoader from "../../modules/UI/renderLoader";
import dupNavFix from "../../dupNavFix";
import GuestFilter from "../../modules/GuestFilter";

const Icon = require('react-native-vector-icons/Ionicons');

function mapStateToProps(state, ownProps) {
    var guests = guestObjectToArray(state.guests, state.interactions);
    return {
        guests: guests,
        loading: state.loading,
        interactions: state.interactions,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
    };
}

function guestObjectToArray(IdsToGuests, IdsToInteractions) {
    var guestList = []
    for (var Id in IdsToGuests) {
        guestList.push({
            "Id" : Id,
            "name" : IdsToGuests[Id].name,
            "lastInteractionString" : computeTimeStampString(IdsToGuests[Id].interactions, IdsToInteractions),
            "description": IdsToGuests[Id].description,
            "age" : IdsToGuests[Id].age,
            "gender": IdsToGuests[Id].gender,
            "color": IdsToGuests[Id].color,
            "actionItems": IdsToGuests[Id].actionItems
        });
    }
    guestList.sort((a, b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

    return guestList;
}

function computeTimeStampString(interactionIds, IdsToInteractions) {
    if (interactionIds == null) {
        return "No interactions ";
    } else if (typeof(interactionIds) !== 'object') {
        // TODO : we shouldn't ever need this, but branches not synced have caused issues with types not matching
        return "ERROR: INTERACTIONS ARE IMPROPPER TYPE: " + typeof(interactionIds);
    }
    else {
        if (interactionIds[0] != null){
                var days = time_diff(IdsToInteractions[interactionIds[0]].timestamp);
            return "last interaction: " + days + ' days ago';
        } else {
            return "No interactions have timestamps";
        }
    }
}

time_diff = (utc_timestamp) => {
        var d1 = new Date(utc_timestamp),
                d2 = new Date();
        return diff = d2.getUTCDay() - d1.getUTCDay();
}

class GuestList extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.Screen_GuestListProfile = this.Screen_GuestListProfile.bind(this);
        this.props.loading = true;
        this.state = {
            searchInput: '',
            age: '',
            gender: ''
        };
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'add_guest') { // this is the same id field from the static navigatorButtons definition
                this.Screen_GuestListNew();
            }
        }
    };

    Screen_GuestListNew = () => {
        this.props.navigateTo({
            screen: 'Guest_edit', // unique ID registered with Navigation.registerScreen
            passProps: {}, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        })
    };

    Screen_GuestListProfile = (guest) => {
        this.props.navigateTo({
            screen: 'Guest_view', // unique ID registered with Navigation.registerScreen
            passProps: {
                Id: guest.Id,
                //name: "Hey I left this variable so stuff dosn't break but please don't use it!",
                actionItems: "hello"
            }, // Object that will be passed as props to the pushed screen (optional)
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
            backButtonHidden: false, // hide the back button altogether (optional)
            navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        })
    };

    componentDidMount() {
        Icon.getImageSource('ios-person-add-outline', 36).then((add) => {
            this.props.navigator.setButtons({
                rightButtons: [
                    { id: 'add_guest', icon: add },
                ]
            });
        });
    };

    componentWillUpdate(nextProps, nextState) {
        // console.log(this.props.guests);
    };

    renderHeader = () => {
        return ;
    };

    renderListItem = (item) => {
        return(
            <View style={{backgroundColor: item.color}}>
                 <ListItem
                    title = {item.name}
                    titleStyle = {{marginLeft: 0, fontWeight: 'bold'}}
                    subtitle = {
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <View style={{flex: 1, alignSelf: 'flex-start'}}>
                          <Text numberOfLines={2} style={{marginTop: 5, marginLeft: 5, fontSize: 12, color: '#757575', height: 30}}>{item.description}</Text>
                        </View>
                        <View style={{flex: 0.4, flexDirection: 'column', alignSelf: 'flex-end', height: 30}}>
                          <Text style={{fontSize: 12, color: '#1560BD', fontWeight: 'bold'}}>{item.gender} - {item.age}</Text>
                          <Text numberOfLines={1} style={{fontSize: 12, color: '#1560BD', fontStyle: 'italic'}}>{item.lastInteractionString}</Text>
                        </View>
                      </View>
                    }
                    containerStyle = {{ borderBottomWidth: 0, marginLeft: 10, backgroundColor:"#F5FCFF" }}
                    onPress = {() => this.Screen_GuestListProfile(item)}
                />
            </View>
        );
    };

    filterGuestData = (guests) => {
      return guests.filter(item => (item.name.toLowerCase().includes(this.state.searchInput) || item.description.toLowerCase().includes(this.state.searchInput))
                                      && (this.state.age == "" ||this.state.age == item.age)
                                        && (this.state.gender == "" || this.state.gender == item.gender));
    }

    render() {
        if (this.props.loading == true) {
            return renderLoader();
        }

        if (this.props.guests.length < 1) {
          return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center', fontStyle: 'italic'}}>
                {'No guests in database.'}
                </Text>
            </View>
            )
        }

        return (
            <View style={{flex: 1}}>
              <SearchBar
                  cancelButtonTitle="Cancel"
                  placeholder="Search (Ex. Phil Wang)"
                  containerStyle={{backgroundColor: 'transparent'}}
                  onChangeText={(str) => {this.setState({searchInput: str.toLowerCase()})}}
                  onClearText={() => this.setState({searchInput: ''})}
                  value={this.state.searchInput}
                  lightTheme
                  clearIcon={this.state.searchInput !== ''}
              />
            <GuestFilter
                filterOptions={{age: {options: ['Old', 'Young', 'Middle'], color: 'rgba(119, 11, 22, 1)'}, gender: {options: ['F', 'M', "O"], color: '#4E84C4'}}}
                selectedFilters={this.state}
                showFilterPrompt={true}
                onChange={newSelected => this.setState(newSelected)}
            />
              <View style={{flex: 1}}>
                  <FlatList
                      data = {this.filterGuestData(this.props.guests)}
                      renderItem={({item}) => this.renderListItem(item)}
                      keyExtractor = {item => item.Id}
                      ItemSeparatorComponent = {() => {return(renderSeperator())}}
                      refreshing = {this.props.refreshing}
                      onEndReached={this.handleLoadMore}
                      onEndReachedThreshold={50}
                  />
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        height: 30,
        width: 45,
        marginLeft: '1%',
        marginRight: '1%',
        alignSelf: 'center',
    },
    button: {
        flex: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 40,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(dupNavFix(GuestList));

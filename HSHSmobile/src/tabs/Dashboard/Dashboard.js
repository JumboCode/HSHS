import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Button,
    Alert,
    NativeModules,
    LayoutAnimation,
} from 'react-native';
import {List, ListItem, SearchBar} from "react-native-elements";
import firebase from "firebase";
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import {getGuests, getInteractions, getActionItems, getCompletedActionItems} from '../../redux/actions.js';
import ActionItemList_module from '../../modules/ActionItemList_module';
import Lottery_module from '../../modules/Lottery_module';
import {Icon} from 'react-native-elements'
import renderSeperator from "../../modules/UI/renderSeperator";
import Prompt from 'rn-prompt';
import dupNavFix from "../../dupNavFix";
import {getLotteryWinners, enterWinners} from '../../redux/actions.js';

const IonIcon = require('react-native-vector-icons/Ionicons');
const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

function mapStateToProps(state, ownProps) {
    return {
        actionItems: state.actionItems,
        guests: state.guests,
        loading: state.loading,
        interactions: state.interactions,
        lotteryWinner: state.lotteryWinner,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getGuests: getGuests,
        getInteractions: getInteractions,
        getActionItems: getActionItems,
        getCompletedActionItems: getCompletedActionItems,
    };
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.props.loading = true;
        this.state = {
            isMapFullScreen: true,
            curLat: 42.371664,
            curLong: -71.119837,
            lotteryState: false,
            lotteryWinner: "",
            lotteryState: false,
            promptVisible: false,
        }
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'logout') { // this is the same id field from the static navigatorButtons definition
                firebase.auth().signOut()
                    .then(() => {
                        this.props.navigator.resetTo({
                            title: 'Login',
                            screen: 'Login', // unique ID registered with Navigation.registerScreen
                            // No pass props because new default
                            passProps: {
                            }, // Object that will be passed as props to the pushed screen (optional)

                            animated: true, // does the push have transition animation or does it happen immediately (optional)
                            animationType: 'fade', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
                            backButtonHidden: true, // hide the back button altogether (optional)
                            navigatorStyle: {
                                navBarHidden: true,
                                tabBarHidden: true,
                                statusBarHidden: true
                            }, // override the navigator style for the pushed screen (optional)
                            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    componentDidMount() {

    };

    //TODO: lotteryWinner isn't properly mapped to props fix please
    componentDidMount() {
      IonIcon.getImageSource('ios-log-out', 36).then((icon) => {
          this.props.navigator.setButtons({
              rightButtons: [
                  { id: 'logout', icon: icon },
              ]
          });
      });
        this.makeRemoteRequest();
        navigator.geolocation.watchPosition((pos) => {
          this.setState({
            curLat: pos.coords.latitude,
            curLong: pos.coords.longitude
          });
        }, (error) => {
          Alert.alert(error.message);
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 50});

    };

    makeRemoteRequest = () => {
        this.props.getInteractions();
        this.props.getGuests();
        this.props.getActionItems();
        this.props.getCompletedActionItems();
    };

    componentWillUpdate(nextProps, nextState) {
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderMarkers = () => {
        var markers = [];
        if (this.props.actionItems) {
            for (var actionItemId in this.props.actionItems) {
              (function(id, self){
                  let actionItem = self.props.actionItems[id];
                  let coordinate = {latitude: actionItem.locationCoord.lat, longitude: actionItem.locationCoord.lng};
                  markers.push(
                      <MapView.Marker
                          coordinate={coordinate}
                          title={actionItem.title}
                          description={actionItem.description}
                          key={id}
                          pinColor = {actionItem.color}
                          onPress={()=>{self.setSelectActionItem(id)}}
                          onDeselect={() => {self.setSelectActionItem(null)}}
                      />
                  )
              })(actionItemId, this)
            }
        }
        return markers;
    };

    setSelectActionItem = (id) => {
      this.setState({selectedActionItem: id});
    }

    updateLotteryState = () => {
      return ;
    }

    _showLotteryInputDialog() {
      this.setState({promptVisible: true});
    }

    _renderSelectedActionItem() {
      if (this.state.selectedActionItem) {
        return (
          <ActionItemList_module 
            style={{flex: 1}}
            actionItems={this.props.actionItems}
            guests={this.props.guests}
            navigator={this.props.navigator}
            selectedActionItem={this.state.selectedActionItem}
          />
        );
      }

      return null;
    }

    // I'm not sure if this is the best way to have logical statements within renders, but it's not the worst way!
    render() {
        return (

            (this.props.loading && <ActivityIndicator animating size="large"/>) ||

            (!this.props.loading &&
                <View style={{flex: 1}}>
                {renderSeperator()}
                    <MapView
                        showsUserLocation={true}
                        region={{
                            latitude: this.state.curLat,
                            longitude: this.state.curLong,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01
                        }}
                        style={{
                            height: this.state.isMapFullScreen ? Dimensions.get('window').height * 0.4 : Dimensions.get('window').height,
                            width: Dimensions.get('window').width,
                            margin: 0
                        }}
                        >
                        {
                           this.props.actionItems && this.renderMarkers()
                        }
                    </MapView>
                    {renderSeperator()}

                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}>
                        <Icon
                            size={36}
                            underlayColor='transparent'
                            name={this.state.isMapFullScreen ? 'fullscreen' : 'fullscreen-exit'}
                            onPress={() => {
                                this.setState(previousState => {
                                    return {isMapFullScreen: !previousState.isMapFullScreen};
                                });
                            }}/>
                    </View>

                    <View style={{
                        position: 'absolute',
                        top: 5,
                        right: 5
                    }}>
                        <Icon
                            size={28}
                            underlayColor='transparent'
                            name='my-location'
                            onPress={() => {
                                navigator.geolocation.getCurrentPosition((pos) => {
                                  this.setState({
                                    curLat: pos.coords.latitude,
                                    curLong: pos.coords.longitude
                                  });
                                }, (error) => {
                                  Alert.alert(error.message);
                                }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
                            }}
                        />
                    </View>

                    <View style={{flex: 1}}>
                      {this._renderSelectedActionItem()}

                      <View style={styles.centeredContainer}>
                        <Lottery_module
                          style={{flex: 1}}
                          showDialogCallback={() => {this._showLotteryInputDialog()}}
                          winners={this.state.lotteryWinner}
                        />

                        <Prompt
                          title="Please enter winners"
                          visible={this.state.promptVisible}
                          onCancel={ () => this.setState({promptVisible: false}) }
                          onSubmit={ value => {
                            enterWinners(value, new Date());
                            this.setState({promptVisible: false})
                          }}
                        />
                      </View>
                    </View>
                </View>
            )
        );
    }
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(dupNavFix(Dashboard));

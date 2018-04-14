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
import {connect} from 'react-redux';
import MapView from 'react-native-maps';
import {getGuests, getInteractions, getActionItems, getCompletedActionItems} from '../../redux/actions.js';
import ActionItemList_module from '../../modules/ActionItemList_module';
import Lottery_module from '../../modules/Lottery_module';
import {Icon} from 'react-native-elements'
import renderSeperator from "../../modules/UI/renderSeperator";
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';
import PromptDialog from "../../modules/PromptDialog"

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

function mapStateToProps(state, ownProps) {
    return {
        actionItems: state.actionItems,
        guests: state.guests,
        loading: state.loading,
        interactions: state.interactions
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getGuests: getGuests,
        getInteractions: getInteractions,
        getActionItems: getActionItems,
        getCompletedActionItems: getCompletedActionItems
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
            curLong: -71.119837
        }
    };

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together

    };

    componentDidMount() {
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
                      />
                  )
              })(actionItemId, this)
            }
        }
        return markers;
    };

    setSelectActionItem = (id) => {
      this.setState({selectedInteraction: id});
    }

    onPopupSubmit = () => {
      return ;
    }

    onPopupCancel = () => {
      return ;
    }

    // I'm not sure if this is the best way to have logical statements within renders, but it's not the worst way!
    render() {
        return (

            (this.props.loading && <ActivityIndicator animating size="large"/>) ||

            (!this.props.loading &&
                <View>
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

                    {/*!this.props.actionItems || this.props.actionItems.length <= 1
                        ? <ActivityIndicator animating size="large"/>

                        : <ActionItemList_module actionItems={this.props.actionItems}
                                          guests={this.props.guests}
                                          dashboard={true}
                                          selectedInteraction={this.state.selectedInteraction}
                                          navigator={this.props.navigator}/>
                    */}


                    <Lottery_module
                      popupDialog={this.promptDialog}/>

                    <PromptDialog
                      title="Please enter winners"
                      ref={(popupDialog) => { this.promptDialog = popupDialog; }}/>
                      
                    {/*
                    <PopupDialog
                        dialogStyle={{ position: 'absolute', top: "40%", width: '80%', height: 100 }}
                        dialogTitle={<DialogTitle title="Enter Winners"/>}
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    >
                        <View style={styles.container}>
                          <TextInput
                            {...this.props}
                            style={styles.textInput}
                            onChangeText={(input) => this.setState({input})}
                            value={this.state.input}
                          />
                          <View style={styles.buttonContainer}>
                            <Button onPress={this.onPopupCancel} title={"Cancel"}/>
                            <Button onPress={this.onPopupSubmit} title={"Submit"}/>
                          </View>
                        </View>
                    </PopupDialog> */
                    }
                      {
                      /*
                      <View style={{flexDirection: 'column', alignItems: 'center'}}>
                      <View style={{margin: 30}}>
                        <Text>Status: Countdown till lottery</Text>
                      </View>
                      Page displays lottery numbers after 9:30
                      <View style={{flexDirection: 'row'}}>
                          <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                          <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                          <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                          <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                          <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                          <View style={{width: 50, height: 50, backgroundColor: 'powderblue', borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center'}}><Text>0</Text></View>
                      </View>

                      <Button
                          title={"Call on Lottery"}
                          color="#841584"
                          accessibilityLabel="Learn more about this purple button"
                          onPress={() => {
                              Alert.alert("", "Call on Lottery Button Pressed");
                          }}
                      />
                      </View>
                      */
                    }
                </View>
            )
        );
    }
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, {Component} from 'react';
import {store} from './redux/store.js';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import firebase from "firebase";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TextInput,
    Alert,
    Dimensions,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import Toast from 'react-native-root-toast';
import Prompt from 'rn-prompt';
import {Button} from 'react-native-elements';
// Dashboard
import Dashboard from './tabs/Dashboard/Dashboard';

// Guests
import Guest_list from './tabs/Guests/Guest_list';
import Guest_edit from './tabs/Guests/Guest_edit';
import Guest_view from './tabs/Guests/Guest_view';

// ActionItem
import ActionItem_view from './tabs/ActionItems/ActionItem_view';
import ActionItem_edit from './tabs/ActionItems/ActionItem_edit';
import ActionItem_list from './tabs/ActionItems/ActionItem_list';

// Interaction
import Interaction_new from './tabs/Interactions/Interaction_new';
import Interaction_view from './tabs/Interactions/Interaction_view';

// Resources
import Resources_menu from './tabs/Resources/Resources_menu';
import Resources_search from './tabs/Resources/Resources_search';

// UI
import Icon from 'react-native-vector-icons/Ionicons';
import renderLoader from './modules/UI/renderLoader'
import {List, ListItem, SearchBar} from "react-native-elements";

const {height, width} = Dimensions.get('window');
const Icons = require('react-native-vector-icons/Ionicons');

var homeIcon // ios-home-outline
var actionItemIcon // ios-checkbox-outline
var checkinIcon // ios-list-outline
var guestsIcon // ios-people-outline
var resourcesIcon // ios-help-circle-outline
var addIcon // ios-add-circle-outline

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoggingIn: true,
            promptVisible: false
        };
        this.autenticate = this.authenticate.bind(this);
    }

    componentDidMount = () => {
        this._isMounted = true;
        console.log("start loging");
        //this.setState({isLoggingIn: false});
        firebase.auth().onAuthStateChanged((user) => {
            console.log("end loging");
            // Check to make sure the component is mounted first, since
            // we don't want to setState upon logout.
            if (this._isMounted) {
                this.setState({isLoggingIn: false});
                if (user) {
                    this.openApp();
                }
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    openApp() {
        this._populateIcons().then(() => {
            // Start app only if all icons are loaded
            this.startApp();
        }).catch((error) => {
            console.error(error);
        });
    };

    authenticate = () => {
        //console.log(this.state.username + " " + this.state.password);
        this.setState({
            isLoggingIn: true
        });

        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then(() => {
                //this.openApp();
                this.setState({
                    isLoggingIn: false
                });
            })
            .catch(() => {
                // TODO: IMPORTANT! ALERT!
                // This is just so we don't have to login every time------ DO NOT SHIP THIS
                //if (this.state.username == "" && this.state.password == "") {
                //  this.openApp();
                //} else {
                Alert.alert(
                    'Login failed',
                    'Unable to login. Username or password is incorrect',
                );
                //}
                this.setState({
                    isLoggingIn: false
                });
            });
    };

    forgotPassword = () => {
        this.setState({promptVisible: true});
    };

    _populateIcons = function () {
        return new Promise(function (resolve, reject) {
            Promise.all(
                [
                    Icons.getImageSource('ios-home-outline', 30),
                    Icons.getImageSource('ios-checkbox-outline', 30),
                    Icons.getImageSource('ios-add-circle', 30),
                    Icons.getImageSource('ios-people-outline', 30),
                    Icons.getImageSource('ios-help-circle-outline', 30),
                    Icons.getImageSource('ios-add-circle-outline', 30),
                ]
            ).then((values) => {
                homeIcon = values[0];
                actionItemIcon = values[1];
                checkinIcon = values[2];
                guestsIcon = values[3];
                resourcesIcon = values[4];
                addIcon = values[5];
                resolve(true);
            }).catch((error) => {
                console.log(error);
                reject(error);
            }).done();
        });
    };

    startApp() {
        // this will start our app
        Navigation.registerComponent('Dashboard', () => Dashboard, store, Provider);
        Navigation.registerComponent('Guest_list', () => Guest_list, store, Provider);
        Navigation.registerComponent('Guest_view', () => Guest_view, store, Provider);
        Navigation.registerComponent('Resources_menu', () => Resources_menu, store, Provider);
        Navigation.registerComponent('Resources_search', () => Resources_search, store, Provider);
        Navigation.registerComponent('Info', () => Info, store, Provider);
        Navigation.registerComponent('Guest_edit', () => Guest_edit, store, Provider);
        Navigation.registerComponent('ActionItem_list', () => ActionItem_list, store, Provider);
        Navigation.registerComponent('ActionItem_edit', () => ActionItem_edit, store, Provider);
        Navigation.registerComponent('ActionItem_view', () => ActionItem_view, store, Provider);
        Navigation.registerComponent('Interaction_new', () => Interaction_new, store, Provider);
        Navigation.registerComponent('Interaction_view', () => Interaction_view, store, Provider);

        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'dashboard',
                    screen: 'Dashboard',
                    title: 'Dashboard',
                    icon: homeIcon
                },
                {
                    label: 'action items',
                    screen: 'ActionItem_list',
                    title: 'Action Items',
                    icon: actionItemIcon,
                },
                {
                    label: 'interaction',
                    screen: 'Interaction_new',
                    title: 'Add Interaction',
                    icon: checkinIcon,
                },
                {
                    label: 'guests',
                    screen: 'Guest_list',
                    title: 'Guests',
                    icon: guestsIcon,
                },
                {
                    label: 'resources',
                    screen: 'Resources_menu',
                    title: 'Resources',
                    icon: resourcesIcon
                }
            ],
            tabsStyle: { // optional, **iOS Only** add this if you want to style the tab bar beyond the defaults
                tabBarButtonColor: 'white',
                tabBarBackgroundColor: '#3a4548',
                tabBarSelectedButtonColor: '#d37272',
                tabBarShowLabels: 'hidden', // "Hey Jacob, why did you add this, this code doesn't wire up to anything!"
                                            // -- "Well, eventually we could follow
                                            // https://github.com/wix/react-native-navigation/issues/676 ,
                                            // and manually edit the npm package!
                                            // however, we would need to change our git pipeline slightly,
                                            // so let's make this a TODO!
                tabBarLabelColor: 'white',
                tabBarSelectedLabelColor: '#d37272',
            },
            appStyle: {
                navigationBarColor: '#000000',
                navBarBackgroundColor: '#F7f7f7',
                navBarButtonColor: '#000000',
                navBarTextColor: '#2a2a2a'
            },
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} resizeMode="contain" source={require('../hshsLogo.png')}/>
                </View>
                <Text style={styles.title}> Harvard Square Homeless </Text>
                <Text style={styles.title}> Shelter Volunteer App </Text>
                {this.state.isLoggingIn ? renderLoader() :
                    <View>
                        <View style={styles.inputBlock}>
                            <View style={styles.row}>
                                <Icon style={styles.icon}
                                      name="ios-mail-outline"
                                      size={25}
                                      color="#770B16"
                                />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Username'
                                    placeholderTextColor="#770B16"
                                    onChangeText={(text) => this.state.username = text}
                                />
                            </View>
                            <View style={styles.row}>
                                <Icon style={styles.icon}
                                      name="ios-lock-outline"
                                      size={25} color="#770B16"/>
                                <TextInput style={styles.textInput}
                                           placeholder='Password'
                                           secureTextEntry={true}
                                           placeholderTextColor="#770B16"
                                           onFocus={() => Toast.show('Hint: Your password must be at least 8 characters long and contain a mix of numbers, lowercase, and uppercase letters.', {
                                               duration: Toast.durations.LONG,
                                               position: Toast.positions.TOP,
                                               shadow: true,
                                               animation: true,
                                               hideOnPress: true,
                                               delay: 0
                                           })}
                                           onChangeText={(text) => this.state.password = text}
                                />
                            </View>
                        </View>
                        <View>
                            <Button
                                small
                                backgroundColor="#556A5B"
                                onPress={this.authenticate}
                                title='Log In'
                                buttonStyle={{width: width * 0.8}}
                            />
                            <View style={styles.forgetView}>
                                <Text onPress={this.forgotPassword} style={styles.forgotPassword}>
                                    Forgot your password?
                                </Text>
                                <Text onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'Signup', // unique ID registered with Navigation.registerScreen
                                        passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                                        animationType: 'slide-horizontal', // ‘fade’ (for both) / ‘slide-horizontal’ (for android) does the push have different transition animation (optional)
                                        backButtonHidden: false, // hide the back button altogether (optional)
                                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                                    });
                                }} style={styles.forgotPassword}>
                                    Got a key? Sign up here.
                                </Text>
                            </View>
                        </View>
                    </View>
                }
                <Prompt
                    title="Reset your password"
                    placeholder="Enter your email here."
                    visible={this.state.promptVisible}
                    onCancel={() => this.setState({promptVisible: false})}
                    onSubmit={(value) => {
                        this.setState({promptVisible: false});
                        firebase.auth().sendPasswordResetEmail(value).then(() => {
                        }).catch((err) => {
                            console.log(err);
                        })
                    }}/>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(247, 247, 247)',
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#770B16',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 7
    },
    login: {
        width: 260,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#556A5B',
    },
    title: {
        paddingTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        color: "#770B16",
    },
    forgotPassword: {
        fontSize: 12,
        color: "#770B16",
        marginTop: 15,
    },
    textInput: {
        color: "#770B16",
        width: 275,
        fontSize: 15,
        backgroundColor: 'rgb(247, 247, 247)',
    },
    icon: {
        paddingRight: 10,
        paddingLeft: 7
    },
    space: {
        height: 15
    },
    inputBlock: {
        marginBottom: 20,
        marginTop: 20
    },
    forgetView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    logo: {
        height: 70,
        width: 70
    },
});

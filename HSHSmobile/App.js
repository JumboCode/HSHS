import GuestList from './src/GuestList';
<<<<<<< c0d22032d398db94e40c500d080619c90335e525
import Info from './src/Info';
import GuestProfile from './src/GuestProfile';
import CRUDnote from './src/CRUDnote';
import NewGuest from './src/NewGuest';

export default  () => {
    return new App()
};

const {Navigation} = require('react-native-navigation');
const Icon = require('react-native-vector-icons/Ionicons');

var homeIcon // ios-home-outline
var todolistIcon // ios-paper-outline
var checkinIcon // ios-list-outline
var guestsIcon // ios-people-outline
var rescourcesIcon // ios-help-circle-outline

class App {
  constructor() {
=======

import Info from './src/Info';
import React from 'react'; 
//import { render } from 'react-dom'; 
import { Provider } from 'react-redux'; 
//import App from './containers/App'; 
import { configureStore } from './src/redux/store/store.js'

console.log(configureStore);
//const store = configureStore(); 

/*render( 
  <Provider store={store}> 
        <GuestList /> 
  </Provider>
);*/
>>>>>>> store is undefined

    this._populateIcons().then(() => {
      // Start app only if all icons are loaded
      this.startApp();
    }).catch((error) => {
      console.error(error);
    });
  }

  _populateIcons = function () {
    return new Promise(function (resolve, reject) {
      Promise.all(
        [
            Icon.getImageSource('ios-home-outline', 30),
            Icon.getImageSource('ios-list-outline', 30),
            Icon.getImageSource('ios-paper-outline', 30),
            Icon.getImageSource('ios-people-outline', 30),
            Icon.getImageSource('ios-help-circle-outline', 30)
        ]
      ).then((values) => {
        homeIcon = values[0];
        todolistIcon = values[1];
        checkinIcon = values[2];
        guestsIcon = values[3];
        rescourcesIcon = values[4];
        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(error);
      }).done();
    });
  };

<<<<<<< c0d22032d398db94e40c500d080619c90335e525
    startApp() {
    // this will start our app
=======
export default () => {
>>>>>>> store is undefined
    Navigation.registerComponent('GuestList', () => GuestList);
    Navigation.registerComponent('GuestProfile', () => GuestProfile);
    Navigation.registerComponent('Info', () => Info);
    Navigation.registerComponent('CRUDnote', () => CRUDnote);
    Navigation.registerComponent('NewGuest', () => NewGuest);

    // TODO: make the tabs link to real pages
    Navigation.startTabBasedApp({
        tabs: [
            {
                label:'dashboard',
                screen: 'Info',
                title: 'Dashboard',
                icon: homeIcon

            },
            {
                label: 'todo_list',
                screen: 'Info',
                title: 'Todo List',
                icon: todolistIcon
            },
            {
                label: 'check_in',
                screen: 'Info',
                title: 'Check In',
                icon: checkinIcon
            },
            {
                label: 'guests',
                screen: 'GuestList',
                title: 'Guests',
                icon: guestsIcon
            },
            {
                label: 'rescources',
                screen: 'Info',
                title: 'Rescources',
                icon: rescourcesIcon
            }
        ]
    })
    }
}

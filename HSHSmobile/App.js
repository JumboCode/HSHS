import GuestList from './src/GuestList';
import Info from './src/Info';
import GuestProfile from './src/GuestProfile';

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

    startApp() {
    // this will start our app
    Navigation.registerComponent('GuestList', () => GuestList);
    Navigation.registerComponent('GuestProfile', () => GuestProfile);
    Navigation.registerComponent('Info', () => Info);

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

import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store.js';
import GuestListNew from './src/tabs/GuestList/GuestListNew';


import Login from './src/Login';

export default () => {
    return new App()
};

class App {
  constructor() {
    this.startApp();
  }

    startApp() {
        // this will start our app

        // Navigation.registerComponent('Login', () => Login, store, Provider);

        Navigation.registerComponent('Login', () => GuestListNew, store, Provider);

        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Login',
                //title: 'Dashboard',
                navigatorStyle: { navBarHidden: true },
             },
        });
    }
}

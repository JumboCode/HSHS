import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store.js';
import GuestList from './src/GuestList';
import Dashboard from './src/Dashboard';
import Login from './src/Login';
import Info from './src/Info';
import GuestListProfile from './src/GuestListProfile';
import CRUDnote from './src/CRUDnote';
import GuestListNew from './src/GuestListNew';

export default () => {
    return new App()
};

class App {
  constructor() {
    this.startApp();
  }

    startApp() {
        // this will start our app
        Navigation.registerComponent('Login', () => Login, store, Provider);

        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Login',
                //title: 'Dashboard',
                navigatorStyle: { navBarHidden: true },
             },
        });
    }
}

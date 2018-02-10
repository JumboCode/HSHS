import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store.js';
import GuestList from './src/tabs/GuestList/GuestList';
import Dashboard from './src/tabs/Dashboard/Dashboard';
import Login from './src/Login';
import Info from './src/dummy/BoilerPlate/TemporaryTab';
import GuestListProfile from './src/tabs/GuestList/GuestListProfile';
import CRUDnote from './src/tabs/GuestList/CRUDnote';
import GuestListNew from './src/tabs/GuestList/GuestListNew';

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

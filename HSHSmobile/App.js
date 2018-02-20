import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store.js';

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
        // we only register login here, and register the rest of the app in login so that the navigations are mutually exclusive
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

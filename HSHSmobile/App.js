import { Navigation } from 'react-native-navigation';

import GuestList from './src/GuestList';
import Info from './src/Info';

export default () => {
    Navigation.registerComponent('GuestList', () => GuestList);
    Navigation.registerComponent('Info', () => Info);

    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Guests',
                screen: 'GuestList',
                title: 'Guests'
            },
            {
                label: 'Info',
                screen: 'Info',
                title: 'Info'
            },
        ]
    })
};


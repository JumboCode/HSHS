import { Navigation } from 'react-native-navigation';

import GuestList from './src/GuestList';
import Info from './src/Info';
import NewGuest from './src/NewGuest';

export default () => {
    Navigation.registerComponent('GuestList', () => GuestList);
    Navigation.registerComponent('Info', () => Info);
    Navigation.registerComponent('NewGuest', () => NewGuest);

    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Guests',
                screen: 'GuestList',
                title: 'Guests',
                icon: require('./meme_icon.png')
            },
            {
                label: 'Info',
                screen: 'Info',
                title: 'Info',
                icon: require('./meme_icon.png')
            },
            {
                label: 'Add Guest',
                screen: 'NewGuest',
                title: 'New Guest'
            }
        ]
    })
};

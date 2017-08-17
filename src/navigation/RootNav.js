import {StackNavigator} from 'react-navigation';
import UnauthenStackNav from './UnauthenStackNav';
import SplashScreen from '../screens/SplashScreen';
import {DrawerMenuNav} from './DrawerNav';

export const RootNav = StackNavigator({
        SplashScreen: {
            screen: SplashScreen
        },
        AuthenStackNav: {
            screen: DrawerMenuNav
        },
        UnauthenStackNav: {
            screen: UnauthenStackNav
        },
    },
    {
        headerMode: 'none'
    }
);



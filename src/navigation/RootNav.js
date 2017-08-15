import {StackNavigator} from 'react-navigation';
import UnauthenStackNav from './UnauthenStackNav';
import Main from '../screens/authorized/Main';
import SplashScreen from '../screens/SplashScreen';
import SearchFriend from '../components/SearchFriends';
import Chat from '../screens/authorized/Chat/Chat';
import VideoCall from '../screens/authorized/Call/VideoCall';

export const RootNav = StackNavigator({
        SplashScreen: {
            screen: SplashScreen
        },
        AuthenStackNav: {
            screen: Main
        },
        UnauthenStackNav: {
            screen: UnauthenStackNav
        },
        SearchFriend: {
            screen: SearchFriend
        },
        Chat: {
            screen: Chat
        },
        VideoCall: {
            screen: VideoCall
        }
    },
    {
        headerMode: 'screen'
    }
);



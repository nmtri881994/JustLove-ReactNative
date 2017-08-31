import {StackNavigator} from 'react-navigation';
import UnauthenStackNav from './UnauthenStackNav';
import SplashScreen from '../screens/SplashScreen';
import SearchFriend from '../components/SearchFriends';
import Chat from '../screens/authorized/Chat/Chat';
import VideoCall from '../screens/authorized/Call/VideoCall';
import AddMemoryAndReminderContainer from '../screens/authorized/Memories/AddMemoryAndReminder/AddMemoryAndReminderContainer'
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
        SearchFriend: {
            screen: SearchFriend
        },
        Chat: {
            screen: Chat
        },
        VideoCall: {
            screen: VideoCall
        },
        AddMemoryAndReminder:{
            screen: AddMemoryAndReminderContainer,
            navigationOptions: ({navigation}) => ({
                title: 'Thêm',
            }),
        }
    },
    {
        headerMode: 'none'
    }
);



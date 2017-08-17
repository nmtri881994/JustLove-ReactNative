/**
 * Created by minhphan on 7/24/2017.
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import ChatScreen from '../screens/authorized/Chat/ChatScreen';
import Main from '../screens/authorized/Main';
import DrawerMenu from "../components/DrawerMenu";
import VideoCall from '../screens/authorized/Call/VideoCall';
import SearchFriend from '../components/SearchFriends';

let {width} = Dimensions.get('window');


const ChatStackNav = StackNavigator({
        ChatScreen: {
            screen: ChatScreen
        }
    },
    {
        headerMode: 'screen'
    }
);

export const DrawerMenuNav = DrawerNavigator({
        AuthenStackNav: {
            screen: Main
        },
        ChatScreen: {
            screen: ChatStackNav,
            navigationOptions: {
                drawer: null,
            }
        },
        VideoCall: {
            screen: VideoCall
        },
        SearchFriend: {
            screen: SearchFriend
        },
    },
    {
        drawerWidth: width / 2,
        drawerPosition: 'left',
        contentComponent: props => <DrawerMenu {...props} />
    }
);

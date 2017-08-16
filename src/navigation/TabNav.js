/**
 * Created by minhphan on 7/24/2017.
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {TabNavigator, NavigationActions} from 'react-navigation';
import Home from '../screens/authorized/Home';
import ChatScreen from '../screens/authorized/ChatScreen';
import Chat from '../screens/authorized/Chat/Chat';
import Memories from '../screens/authorized/Memories';
import Location from '../screens/authorized/Location';

const {width, height} = Dimensions.get('window');

let navigate;

export default MainTabNav = TabNavigator({
        HomeScreen: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'My Love'
            }
        },
        ChatScreen: {
            screen: ChatScreen,
            navigationOptions: {
                tabBarLabel: 'Chat',
            },

        },
        MemoriesScreen: {
            screen: Memories,
            navigationOptions: {
                tabBarLabel: 'Memories'
            }
        },
        LocationScreen: {
            screen: Location,
            navigationOptions: {
                tabBarLabel: 'Location'
            }
        }
    }, {
        // navigationOptions: ({navigation}) => {
        //     navigate = navigation
        // },
        tabBarOptions: {
            style: {
                height: height / 20,
                backgroundColor: '#7E007E',
            },
            labelStyle: {
                marginTop: 0,
                fontSize: 12,
                fontWeight: 'bold'
            },
            activeTintColor: '#fff',
            inactiveTintColor: '#AFEAF2',
            showLabel: true,
            // onTabPress: (tab) => {
            //     console.log('Tab', tab);
            //     if (tab.route.routeName === 'ChatScreen') {
            //         console.log('Hello');
            //         let nav = NavigationActions.navigate({routeName: 'Chat'});
            //         navigate.dispatch(nav);
            //     }
            // }
        },
        swipeEnabled: true,

    }
);

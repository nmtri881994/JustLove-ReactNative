/**
 * Created by minhphan on 7/24/2017.
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Home from '../screens/authorized/Home';
import Chat from '../screens/authorized/Chat';
import Memories from '../screens/authorized/Memories';
import Location from '../screens/authorized/Location';

const {width, height} = Dimensions.get('window');

export default MainTabNav = TabNavigator({
        HomeTabView: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'My Love',
            }
        },
        ChatTabView: {
            screen: Chat,
            navigationOptions: {
                tabBarLabel: 'Chat',
            },
        },
        MemoriesTabView: {
            screen: Memories,
            navigationOptions: {
                tabBarLabel: 'Memories',
            }
        },
        LocationTabView: {
            screen: Location,
            navigationOptions: {
                tabBarLabel: 'Location'
            }
        }
    }, {
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
        },
    }
);

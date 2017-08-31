/**
 * Created by minhphan on 7/24/2017.
 */
import React from 'react';
import {Dimensions} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Home from '../screens/authorized/Home/Home';
import Chat from '../screens/authorized/Chat/Chat';
import Memories from '../screens/authorized/Memories/Memories';
import Location from '../screens/authorized/Location/LocationScreen';

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
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Kỉ niệm',
            }),
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './stores';
import AppNavigator from'./AppNavigator';
import EditProfile from "./screens/unauthorized/EditProfile";
import Chat from "./screens/authorized/Chat/Chat";
import Location from "./screens/authorized/Location";
import VideoCall from "./screens/authorized/Call/VideoCall";

class Application extends Component {

    render() {
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('LoveApp', () => Application);
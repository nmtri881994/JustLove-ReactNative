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
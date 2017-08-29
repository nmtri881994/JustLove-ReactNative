/**
 * Created by XuanVinh on 8/7/2017.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native';

import {connect} from 'react-redux';

//import components
import AddMemoryAndReminderComponent from './AddMemoryAndReminderComponent'

//import actions
import {addReminder} from '../../../../actions/reminderAction'

const AddMemoryAndReminderContainer = connect(
    state => {
        return {
            remindersType1: state.remindersType1
        }
    },
    dispatch => {
        return {
        }
    }
)(AddMemoryAndReminderComponent)

export default AddMemoryAndReminderContainer;
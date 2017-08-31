import {combineReducers} from 'redux';
import RootNavigator from './RootNavigator';
import Authen from './Authen';
import Socket from './SocketIO';
import MemoriesReducer from './MemoriesReducer'
import RemidersReducer from './RemidersReducer'
import remindersType1Reducer from './RemidersType1Reducer'
import GetScreen from './GetScreen';


export default combineReducers({
    nav: RootNavigator,
    authentication: Authen,
    socket: Socket,
    memories: MemoriesReducer,
    reminders: RemidersReducer,
    remindersType1: remindersType1Reducer
    navigation: GetScreen,
});
import {combineReducers} from 'redux';
import RootNavigator from './RootNavigator';
import Authen from './Authen';
import Socket from './SocketIO';


export default combineReducers({
    nav: RootNavigator,
    authentication: Authen,
    socket: Socket,
});
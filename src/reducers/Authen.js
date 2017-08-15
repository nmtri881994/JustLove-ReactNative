/**
 * Created by minhphan on 7/14/2017.
 */
import {LOGIN_LOCAL, LOGOUT} from '../actions/types';
const DEFAULT_STATE = {
    loggedIn: false,
    user: null,
    target: null,
};
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case LOGIN_LOCAL:
            return {loggedIn: true, user: action.user, target: action.target};
        case LOGOUT:
            return DEFAULT_STATE;
        default:
            return state;
    }
}
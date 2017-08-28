import {GET_SCREEN} from '../actions/types';
const DEFAULT_STATE = {
    screen: null,
};
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_SCREEN:
            return {screen: action.screen};
        default:
            return state;
    }
}

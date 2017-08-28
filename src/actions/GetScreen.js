import {GET_SCREEN} from './types';

export const getScreen = (routeName) => {
    return (dispatch) => {
        dispatch({
            type: GET_SCREEN,
            screen: routeName,
        });
    }
}

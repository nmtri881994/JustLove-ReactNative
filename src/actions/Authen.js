/**
 * Created by minhphan on 7/14/2017.
 */
import {LOGIN_LOCAL} from './types';
import {NavigationActions} from 'react-navigation';
import AsyncStorageAccess from '../api/AsyncStorageAccess';

export const loginSuccess = (user, token, target) => {
    return (dispatch) => {
        AsyncStorageAccess.saveToStorage('@loginToken', token);
        AsyncStorageAccess.saveToStorage('@user', user);
        dispatch({
            type: LOGIN_LOCAL,
            target,
            user
        });

        const navigateAction = NavigationActions.navigate({
            routeName: 'AuthenStackNav',
        });
        dispatch(navigateAction);
    }
};
import {
    SettingsAPI,
    UpdateUserSettingsRequestProps,
} from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps, UserSettingsProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_USER_SETTINGS = 'SET_USER_SETTINGS';

export const setUserSettingsAction = (payload: UserSettingsProps) => ({
    type: SET_USER_SETTINGS,
    payload,
});

export const getUserSettingsThunk = (userId: number): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    SettingsAPI.getUserSettings(userId).then((userInfo) => {
        const settings: UserSettingsProps = JSON.parse(userInfo.settings);

        dispatch(
            setUserSettingsAction(settings),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

export const updateUserSettingsThunk = (
    data: UpdateUserSettingsRequestProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    SettingsAPI.updateUserSettings(data)
        .then(() => {
            dispatch(getUserSettingsThunk(data.id));
        })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

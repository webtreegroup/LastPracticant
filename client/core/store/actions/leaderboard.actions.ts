import { LeaderboardAPI } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { LeaderboardModelProps } from 'server/models/models.types';
import { StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_LEADERBOARD = 'SET_LEADERBOARD';

export const setLeaderboardAction = (payload: LeaderboardModelProps[]) => ({
    type: SET_LEADERBOARD,
    payload,
});

export const getTopicsThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    LeaderboardAPI.getAllResults().then((leaderboard) => {
        dispatch(
            setLeaderboardAction(leaderboard),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

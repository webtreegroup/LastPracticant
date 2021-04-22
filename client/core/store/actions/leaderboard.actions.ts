import { AddResultRequestProps, LeaderboardAPI } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { LeaderboardProps, StoreProps } from '../store.types';
import { hideLoaderAction, showLoaderAction } from './loader.actions';

export const SET_PLAYERS_SCORES = 'SET_PLAYERS_SCORES';
export const SET_CURRENT_PLAYER_SCORE = 'SET_CURRENT_PLAYER_SCORE';

export const setLeaderboardAction = (payload: LeaderboardProps) => ({
    type: SET_PLAYERS_SCORES,
    payload,
});

export const getPlayersScoresThunk = (): ThunkAction<void, StoreProps, unknown, Action<string>> => (dispatch) => {
    dispatch(showLoaderAction());

    LeaderboardAPI.getAllResults().then((playersScores) => {
        dispatch(
            setLeaderboardAction({ playersScores }),
        );
    })
        .catch(console.error)
        .finally(() => {
            dispatch(hideLoaderAction());
        });
};

export const addResultToLeaderboardThunk = (data: AddResultRequestProps): ThunkAction<void, StoreProps, unknown, Action<string>> => () => {
    LeaderboardAPI.addResult(data);
};

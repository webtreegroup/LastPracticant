import { LeaderboardModelProps } from 'server/models/models.types';
import { ActionProps } from '../actions/actions.types';
import { SET_LEADERBOARD } from '../actions/leaderboard.actions';

const initialState: LeaderboardModelProps[] = [];

export const leaderboardReducers = (state = initialState, action: Required<ActionProps<LeaderboardModelProps[]>>) => {
    switch (action.type) {
    case SET_LEADERBOARD: {
        return action.payload;
    }

    default:
        return state;
    }
};

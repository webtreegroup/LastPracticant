import { HTTP } from './api';
import { BaseAPI } from './base.api';

export type PlayerScore = {
    data: { id: number; name: string; LPTest: number }
};

export type AddPlayerScore = PlayerScore & {
    ratingFieldName: 'LPTest'
};

const getDataLeaderboards = {
    cursor: 0,
    limit: 10,
    ratingFieldName: 'LPTest',
};

export type Leaderboards = PlayerScore[];

const ExpresspLeaderboardAPI = new HTTP('/leaderboard');

export class LeaderboardAPI extends BaseAPI {
    static addPlayerScore(data: AddPlayerScore) {
        return ExpresspLeaderboardAPI.post<string, Response>('', { data, responseFormat: 'text' });
    }

    static getLeaderboards() {
        return ExpresspLeaderboardAPI.post<Leaderboards, Response>('/all', {
            data: getDataLeaderboards,
        });
    }
}

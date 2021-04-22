import { LeaderboardModelProps } from 'server/models/models.types';
import { HTTP } from './api';
import { UserInfoProps } from './auth.api';
import { BaseAPI } from './base.api';

const ExpressLeaderboardAPI = new HTTP('/internal/leaderboard');

export interface AddResultRequestProps extends Omit<LeaderboardModelProps, 'createdAt' | 'updatedAt' | 'id'> {}

export interface GetAllResultsResponseProps extends LeaderboardModelProps {
    user: UserInfoProps
}

export class LeaderboardAPI extends BaseAPI {
    static getAllResults() {
        return ExpressLeaderboardAPI.get<{}, GetAllResultsResponseProps[]>('/');
    }

    static addResult(data: AddResultRequestProps) {
        return ExpressLeaderboardAPI.post<AddResultRequestProps, Response>('/', { data });
    }
}

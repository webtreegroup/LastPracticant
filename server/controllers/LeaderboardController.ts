import { Response, Request } from 'express';

import { postgres } from '../models';

export class LeaderboardController {
    public static getAllResults(req: Request, res: Response) {
        postgres.leaderboard.table.findAll({
            order: [
                ['score', 'DESC'],
            ],
            include: [
                {
                    model: postgres.users.table,
                },
            ],
        })
            .then((leaderboard) => res.status(200).send(leaderboard))
            .catch((error) => {
                res.status(400).send(error);
            });
    }

    public static addResult(req: Request, res: Response) {
        if (!req.body) return res.sendStatus(400);

        postgres.leaderboard.table
            .findOne({
                where: {
                    userId: req.body.userId,
                },
            })
            .then((response) => {
                if (!response) {
                    return postgres.leaderboard.table
                        .create(req.body);
                }

                return response
                    .update({
                        score: response.score > req.body.score ? response.score : req.body.score,
                    });
            })
            .then((response) => res.status(200).send(response))
            .catch((error) => res.status(400).send(error));
    }
}

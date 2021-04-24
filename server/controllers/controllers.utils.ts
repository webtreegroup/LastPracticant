import { postgres } from '../models';
import { users } from './controllers.mixins';

export const fetchTopics = postgres.topics.table.findAll({
    attributes: { exclude: ['description'] },
    order: [
        ['updatedAt', 'ASC'],
    ],
    include: [users],
});

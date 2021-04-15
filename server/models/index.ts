import {
    Sequelize,
    // SequelizeOptions,
} from 'sequelize-typescript';

// import { POSTGRES_CONNECT_OPTIONS } from '../../env';
import path from 'path';
import { TopicModel } from './TopicModel';
import { CommentModel } from './CommentModel';
import { UserModel } from './UserModel';
// import { IS_DEV } from '../../env';

class PostgresConnector {
    sequelize: Sequelize;

    comments: CommentModel;

    topics: TopicModel;

    users: UserModel;

    constructor() {
        console.log('=============================', `${path.resolve()}/cert/root.crt`, '=============================');
        // eslint-disable-next-line global-require
        const cert = require('fs').readFileSync(`${path.resolve()}/cert/root.crt`);
        console.log('----------------------------');
        console.log(cert);
        console.log('----------------------------');
        this.sequelize = new Sequelize('postgres://postgres1:<password>@rc1b-9ucb4ny2bxam8jy8.mdb.yandexcloud.net:6432/postgres1?ssl=true', {
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: true,
                    // eslint-disable-next-line global-require
                    ca: cert,
                },
            },
        });
        this.comments = new CommentModel(this.sequelize);
        this.topics = new TopicModel(this.sequelize);
        this.users = new UserModel(this.sequelize);

        this.topics.table.belongsTo(this.users.table);
        this.comments.table.belongsTo(this.users.table);
        this.topics.table.hasMany(this.comments.table, { onDelete: 'cascade' });
    }

    sync() {
        this.sequelize.sync().then(() => {
            console.info('--------------- Postgres sync successful. ---------------');
        })
            .catch(console.error);
    }
}

export const postgres = new PostgresConnector();

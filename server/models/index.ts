import {
    Sequelize,
    // SequelizeOptions,
} from 'sequelize-typescript';

// import { POSTGRES_CONNECT_OPTIONS } from '../../env';
import path from 'path';
// import pg from 'pg';
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
        // const client = new pg.Client('postgres://postgres1:<password>@rc1a-1qzpz2ebr53e84b6.mdb.yandexcloud.net:6432/postgres1?ssl=true');
        // client.connect();
        console.log('=============================', `${path.resolve()}/cert/CA.pem`, '=============================');
        // eslint-disable-next-line global-require
        const cert = require('fs').readFileSync(`${path.resolve()}/cert/CA.pem`);
        console.log('----------------------------');
        console.log(cert);
        console.log('----------------------------');
        this.sequelize = new Sequelize({
            protocol: 'postgres',
            dialect: 'postgres',
            database: 'postgres1',
            password: 'postgres1',
            username: 'postgres1',
            host: 'rc1a-1qzpz2ebr53e84b6.mdb.yandexcloud.net',
            port: 6432,
            ssl: true,
            dialectOptions: {
                ssl: {
                    ssl: true,
                    rejectUnauthorized: false,
                },
            },
        });
        // this.sequelize = new Sequelize('postgres://postgres1:<password>@rc1a-1qzpz2ebr53e84b6.mdb.yandexcloud.net:6432/postgres1?ssl=true', {
        //     dialectOptions: {
        //         ssl: {
        //             require: true,
        //             rejectUnauthorized: false,
        //             ca: cert,
        //         },
        //     },
        // });
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

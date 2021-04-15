const isDev = process.env.NODE_ENV !== 'production';

const postgresProdConnectOptions = {
    host: 'rc1b-9ucb4ny2bxam8jy8.mdb.yandexcloud.net',
    port: 6432,
};

const postgresDevConnectOptions = {
    host: 'localhost',
    port: 5436,
};

const postgresCommonConnectOptions = {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    dialect: 'postgres',
};

module.exports = {
    IS_DEV: isDev,
    MONGO_HOST: `mongodb://${isDev ? 'localhost' : 'mongo'}:27017`,
    APP_PROD_URL: 'https://last-practicant.herokuapp.com/',
    APP_DEV_URL: 'http://localhost:5000',
    POSTGRES_CONNECT_OPTIONS: {
        ...postgresCommonConnectOptions,
        ...(!isDev
            ? postgresProdConnectOptions
            : postgresDevConnectOptions
        ),
    },
};

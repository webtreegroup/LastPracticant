const isDev = process.env.NODE_ENV !== 'production';

const postgresProdConnectOptions = {
    host: 'rc1a-1qzpz2ebr53e84b6.mdb.yandexcloud.net',
    port: 6432,
    ssl: true,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
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
    protocol: 'postgres',
};

module.exports = {
    IS_DEV: isDev,
    MONGO_HOST: `mongodb://${isDev ? 'localhost' : 'mongo'}:27017`,
    APP_PROD_URL: 'https://reykjavik-last-practicant-3.ya-praktikum.tech',
    APP_DEV_URL: 'http://localhost:5000',
    POSTGRES_CONNECT_OPTIONS: {
        ...postgresCommonConnectOptions,
        ...(!isDev
            ? postgresProdConnectOptions
            : postgresDevConnectOptions
        ),
    },
};

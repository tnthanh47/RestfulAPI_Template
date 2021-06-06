import dotenv from 'dotenv';

const databaseName = 'wrap';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    soketTimeout: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'thanhlenguyen';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password';
const MONGO_HOST = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${databaseName}`;

const MONGO = {
    host: MONGO_HOST,
    usermame: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
    url2: `mongodb://127.0.0.1:27017/${databaseName}`
};

const SERVER_HOSTNAME = process.env.SEVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SEVER_PORT || 8000;
const SERVER_TOKEN_EXPIRETIME = process.env.SEVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SEVER_TOKEN_ISSUER || 'thisIssuer';
const SERVER_TOKEN_SECRET = process.env.SEVER_TOKEN_SECRET || 'superencryptedsecret';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;

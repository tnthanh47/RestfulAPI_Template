import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import axios from 'axios';
import { logging, config } from './src/config';
import { user } from './src/routers';

const NAMESPACE = 'Server';
const router = express();

/**Connect to MongoDB */
mongoose
    .connect(config.mongo.url2, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Connected to MongoDB');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Logging the request */
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

/** Parse the request */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** Rules of API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE PUT POST');
        return res.status(200).json({});
    }

    next();
});

/** Routers */
router.use('/api/user', user);
/** Error handlers */
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/** Create the server. */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`));

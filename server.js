import express from 'express';
import path from 'path';
import cors from 'cors';
import { APP_PORT } from './config';
import errorHandler from './middlewares/errorHandler';

global.appRoot = path.resolve(__dirname); //return path to project's root directory without \ in last

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false })); //to parse body from url
app.use(express.json()); //to parse json content
app.use('/uploads', express.static('uploads'));

import routes from './routes';
app.use('/api', routes);
app.use('/', async(req, res, next) => {
    res.json({ message: "Welcome to Serentax." });
});
app.use(errorHandler);

const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
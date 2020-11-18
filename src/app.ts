import express from 'express';
import cors = require('cors');
import * as bodyParser from 'body-parser';
import api from './api';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public'));
app.use('/api',api);

export default app;
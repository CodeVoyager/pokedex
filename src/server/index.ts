import * as path from 'path';
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
import express from 'express';
import logger from 'morgan';
import { indexRouter } from './components/app/routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_, res, _next) => {
  res.status(404).send('404');
});
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Listening on port: ${process.env.SERVER_PORT}`)
);

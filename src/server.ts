import http from 'http';
import app from './app';
import * as database from './database';

database.getConnection();

http.createServer(app).listen(8080, () => {
  console.log("SERVER is Listening to 8080");
})
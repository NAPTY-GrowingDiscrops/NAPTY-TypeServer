import http from 'http';
import app from './app';



http.createServer(app).listen(8080, () => {
  console.log("SERVER is Listening to 8080");
})
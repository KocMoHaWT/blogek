import * as express from 'express';
import connection from './db/index';

const app = express();
const port = 3000;



app.get('/', (req, res) => {
  res.send(`Hello World!`)
});

connection.then(_ => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
});
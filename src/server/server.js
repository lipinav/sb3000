import express from 'express';
import ReactDOM from 'react-dom/server';
import { Header } from '../shared/Header';
import { Task5 } from '../shared/Task5';
import { indexTemplate } from './indexTemplate';

const app = express();

app.use('/static', express.static('./dist/client'));  // route for static files

app.get('/', (req, res) => {
  res.send(
    indexTemplate(    // template would send from server
      ReactDOM.renderToString(Header())
    ),
  );
});

app.get('/task5', (req, res) => {
  res.send(
    indexTemplate(
      ReactDOM.renderToString(Task5())
    ),
  );
});

app.listen(3000, () => {
  console.log('Servers started on http://localhost:3000');
});

import express from 'express';
import ReactDOM from 'react-dom/server';
import { Header } from '../shared/Header';
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

app.listen(3000, () => {
  console.log('Servers started on http://localhost:3000');
});

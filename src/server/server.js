import express from 'express';
import ReactDOM from 'react-dom/server';
import { App } from '../App';
import { indexTemplate } from './indexTemplate';

const app = express();

app.use('/static', express.static('./dist/client'));  // route for static files

app.get('/', (req, res) => {
  res.send(
    indexTemplate(    // template would send from server
      ReactDOM.renderToString(App())
    ),
  );
});

app.listen(3000, () => {
  console.log('Servers started on http://localhost:3000');
});

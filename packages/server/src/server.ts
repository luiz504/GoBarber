import express from 'express';
import routes from './routes';

const app = express();

const hello = [];

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server On port 3333');
});

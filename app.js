import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import routes from './server/route/index';
import './server/db/config/config';

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my Mock Premier League',
  });
});
app.use('/api/v1', routes);


app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Page Not Found',
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

export default app;

import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Sistema Academico Turing API');
});

export default app;

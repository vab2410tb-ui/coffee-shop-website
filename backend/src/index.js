import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db/index.js';
import route from './routes/index.router.js';
import keepAlive from './keepAlive.js';

dotenv.config();

const app = express();
const port  = process.env.PORT || 8000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Connect DB
db()

route(app);

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port http://localhost:${port}`)
  keepAlive();
})
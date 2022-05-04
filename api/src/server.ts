import cors from 'cors';
import express, { json } from 'express'
import { routes } from './routes';

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(json())
app.use(routes)

app.listen(3333)
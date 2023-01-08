import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router/indexRouter.js'

dotenv.config();

const server = express()
server.use(cors());
server.use(express.json());
server.use(router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}...`)
);

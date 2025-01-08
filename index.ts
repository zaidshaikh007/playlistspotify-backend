import express from 'express';
import dbConnection from './database';

import userRoutes from './routes/userRoutes';
import playListRoutes from './routes/playListRoutes';
import dotenv from 'dotenv';
import cronJobs from './jobs/index';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

dbConnection()
app.use(express.json({ limit: '10mb' }));
app.use(cors());
cronJobs();
app.use('/api/user', userRoutes);
app.use('/api/playlist', playListRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
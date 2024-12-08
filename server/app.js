import express from 'express';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 3000;

import dotenv from 'dotenv';
dotenv.config();

// CORS 미들웨어 추가
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
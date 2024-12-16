import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './router/todo.js';
import projectRouter from './router/projects.js';
import userRouter from './router/users.js';
import projectMemberRouter from './router/projectMembers.js';
import conn from './db.js';

const app = express();
const PORT = process.env.PORT || 9999;
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRouter);
app.use('/api/projects', projectRouter);
app.use('/api/users', userRouter);
app.use('/api/project-members', projectMemberRouter);

conn.authenticate()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.error('데이터베이스 연결 실패:', err);
  });

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});

export default app;



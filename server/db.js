import { Sequelize } from 'sequelize';

const conn = new Sequelize('project3-todo-app', 'admin', 'qwer1234', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

try {
  await conn.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default conn;
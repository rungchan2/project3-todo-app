// models/Todo.js
import { DataTypes } from 'sequelize';
import conn from '../db.js';
import Project from './project.js';
import User from './user.js';

const Todo = conn.define('todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'todos'
});

Todo.belongsTo(Project, { foreignKey: 'project_id' });
Todo.belongsTo(User, { foreignKey: 'created_by' });
Project.hasMany(Todo, { foreignKey: 'project_id' });
User.hasMany(Todo, { foreignKey: 'created_by' });

export default Todo;
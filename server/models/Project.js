// models/Project.js
import { DataTypes } from 'sequelize';
import conn from '../db.js';
import User from './user.js';

const Project = conn.define('projects', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'projects'
});

Project.belongsTo(User, { foreignKey: 'created_by' });
User.hasMany(Project, { foreignKey: 'created_by' });

export default Project;
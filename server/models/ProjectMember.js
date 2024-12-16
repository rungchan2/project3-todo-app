// models/ProjectMember.js
import { DataTypes } from 'sequelize';
import conn from '../db.js';
import Project from './project.js';
import User from './user.js';

const ProjectMember = conn.define('project_members', {
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('member', 'admin'),
    defaultValue: 'member'
  }
}, {
  timestamps: true,
  createdAt: 'added_at',
  updatedAt: false,
  tableName: 'project_members',
  indexes: [
    {
      unique: true,
      fields: ['project_id', 'user_id']
    }
  ]
});

Project.belongsToMany(User, { through: ProjectMember, foreignKey: 'project_id' });
User.belongsToMany(Project, { through: ProjectMember, foreignKey: 'user_id' });

export default ProjectMember;
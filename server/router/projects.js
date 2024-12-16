import express from 'express';
import Project from '../models/project.js';
import { ProjectMember } from '../models/index.js';
import { Todo } from '../models/index.js';
const router = express.Router();

// 모든 프로젝트 조회
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: '프로젝트 목록 조회 실패', error: error.message });
  }
});

// 특정 프로젝트 조회
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ message: '프로젝트를 찾을 수 없습니다.' });
    }
    const members = await ProjectMember.findAll({
      where: {
        project_id: req.params.id
      }
    });

    const projectWithMembers = {
      ...project,
      members
    };

    res.json(projectWithMembers);
  } catch (error) {
    res.status(500).json({ message: '프로젝트 조회 실패', error: error.message });
  }
});

// 새 프로젝트 생성
router.post('/', async (req, res) => {
  const { name, description, created_by } = req.body;
  
  try {
    await conn.beginTransaction();
    const project = await Project.create({
      name,
      description,
      created_by
    });
    
    await ProjectMember.create({
      project_id: project.id,
      user_id: created_by,
      role: 'admin'
    });
    await conn.commit();
    
    res.status(201).json({
      message: '프로젝트가 생성되었습니다.',
      id: project.id
    });
  } catch (error) {
    await conn.rollback();
    res.status(500).json({ message: '프로젝트 생성 실패', error: error.message });
  }
});

// 프로젝트 정보 수정
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;
  
  try {
    const members = await ProjectMember.findAll({
      where: {
        project_id: req.params.id,
        user_id: req.user.id
      }
    });

    if (members.length === 0) {
      return res.status(403).json({ 
        message: '이 프로젝트에 대한 수정 권한이 없습니다.' 
      }).end();
    }
    const project = await Project.findByPk(req.params.id);
    await project.update({
      name,
      description
    });
    
    if (!project) {
      return res.status(404).json({ message: '수정할 프로젝트를 찾을 수 없습니다.' });
    }
    
    res.json({ message: '프로젝트가 수정되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '프로젝트 수정 실패', error: error.message });
  }
});

// 프로젝트 삭제
router.delete('/:id', async (req, res) => {
  try {
    const members = await ProjectMember.findAll({
      where: {
        project_id: req.params.id,
        user_id: req.user.id
      }
    });

    if (members.length === 0) {
      return res.status(403).json({ 
          message: '이 프로젝트에 대한 삭제 권한이 없습니다.' 
        }).end();
    }
    const project = await Project.findByPk(req.params.id);
    await project.destroy();
    res.json({ message: '프로젝트가 삭제되었습니다.' });

  } catch (error) {
    res.status(500).json({ message: '프로젝트 삭제 실패', error: error.message });
  }
});

// id별 프로젝트의 할일 목록 조회
router.get('/:id/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        project_id: req.params.id
      },
      order: [['created_at', 'DESC']]
    });
    
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: '할일 목록 조회 실패', error: error.message });
  }
});

export default router;

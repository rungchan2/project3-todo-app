import express from 'express';
import { Todo } from '../models/index.js';

const router = express.Router();

// 모든 할일 목록 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: '할일 목록 조회 실패', error: error.message });
  }
});

// 특정 프로젝트의 할일 목록 조회
router.get('/project/:projectId', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        project_id: req.params.projectId
      }
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: '프로젝트 할일 목록 조회 실패', error: error.message });
  }
});

// 특정 할일 조회
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다.' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: '할일 조회 실패', error: error.message });
  }
});

// 새로운 할일 생성
router.post('/', async (req, res) => {
  const { project_id, created_by, title, description, start_date, end_date } = req.body;
  
  try {
    const todo = await Todo.create({
      project_id,
      created_by,
      title,
      description,
      start_date,
      end_date
    });
    
    res.status(201).json({
      message: '할일이 생성되었습니다.',
      id: todo.id
    });
  } catch (error) {
    res.status(500).json({ message: '할일 생성 실패', error: error.message });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  
  try {
    const todo = await Todo.findByPk(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: '수정할 할일을 찾을 수 없습니다.' });
    }
    
    await todo.update({
      title,
      description,
      start_date,
      end_date
    });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '수정할 할일을 찾을 수 없습니다.' });
    }
    
    res.json({ message: '할일이 수정되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '할일 수정 실패', error: error.message });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: '삭제할 할일을 찾을 수 없습니다.' });
    }
    
    await todo.destroy();
    
    res.json({ message: '할일이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '할일 삭제 실패', error: error.message });
  }
});

export default router;
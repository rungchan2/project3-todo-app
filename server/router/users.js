import express from 'express';
import { User } from '../models/index.js';

const router = express.Router();

// 모든 사용자 조회
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: '사용자 목록 조회 실패', error: error.message });
  }
});

// 특정 사용자 조회
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '사용자 조회 실패', error: error.message });
  }
});

// 새로운 사용자 생성
router.post('/', async (req, res) => {
    const { username, password_hash, email } = req.body;
    
    try {
      const user = await User.create({
        username,
        password_hash,
        email
      });
      
      res.status(201).json({
        message: '사용자가 생성되었습니다.',
        id: user.id
      });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
          message: '이미 존재하는 사용자명 또는 이메일입니다.' 
        });
      }
      res.status(500).json({ message: '사용자 생성 실패', error: error.message });
    }
});

// 사용자 정보 수정
router.put('/:id', async (req, res) => {
  const { username, email } = req.body;
  
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: '수정할 사용자를 찾을 수 없습니다.' });
    }

    await user.update({
      username,
      email
    });
    
    res.json({ message: '사용자 정보가 수정되었습니다.' });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        message: '이미 존재하는 사용자명 또는 이메일입니다.' 
      });
    }
    res.status(500).json({ message: '사용자 정보 수정 실패', error: error.message });
  }
});

// 사용자 삭제
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: '삭제할 사용자를 찾을 수 없습니다.' });
    }
    
    await user.destroy();
    
    res.json({ message: '사용자가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '사용자 삭제 실패', error: error.message });
  }
});

export default router;
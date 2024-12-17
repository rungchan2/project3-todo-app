import express from 'express';
import { ProjectMember } from '../models/index.js';
const router = express.Router();

// 프로젝트의 모든 멤버 조회
router.get('/project/:projectId', async (req, res) => {
  try {
    const members = await ProjectMember.findAll({
      where: {
        project_id: req.params.projectId
      },
      order: [['added_at', 'DESC']]
    });
    
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: '프로젝트 멤버 목록 조회 실패', error: error.message });
  }
});

// 프로젝트에 멤버 추가
router.post('/', async (req, res) => {
  const { project_id, user_id, role = 'member' } = req.body;
  
  try {
    const admins = await ProjectMember.findAll({
      where: {
        project_id: project_id,
        user_id: req.user.id,
        role: 'admin'
      }
    });

    if (admins.length === 0) {
      return res.status(403).json({ 
        message: '프로젝트 멤버 추가 권한이 없습니다.' 
      });
    }
    const existingMember = await ProjectMember.findOne({
      where: {
        project_id: project_id,
        user_id: user_id
      }
    });

    if (existingMember) {
      return res.status(400).json({ 
        message: '이미 프로젝트 멤버입니다.' 
      });
    }

    const newMember = await ProjectMember.create({
      project_id: project_id,
      user_id: user_id,
      role: role
    });
    
    res.status(201).json({
      message: '프로젝트 멤버가 추가되었습니다.',
      id: newMember.id
    });
  } catch (error) {
    res.status(500).json({ message: '프로젝트 멤버 추가 실패', error: error.message });
  }
});

// 프로젝트 멤버 역할 수정
router.put('/:memberId', async (req, res) => {
  const { role } = req.body;
  
  try {
    const member = await ProjectMember.findByPk(req.params.memberId);

    if (member.length === 0) {
      return res.status(404).json({ message: '멤버를 찾을 수 없습니다.' });
    }

    const admins = await ProjectMember.findAll({
      where: {
        project_id: member.project_id,
        user_id: req.user.id,
        role: 'admin'
      }
    });

    if (admins.length === 0) {
      return res.status(403).json({ 
        message: '프로젝트 멤버 역할 수정 권한이 없습니다.' 
      });
    }

    const [result] = await ProjectMember.update(
      { role: role },
      { where: { id: req.params.memberId } }
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '수정할 멤버를 찾을 수 없습니다.' });
    }
    
    res.json({ message: '멤버 역할이 수정되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '멤버 역할 수정 실패', error: error.message });
  }
});

// 프로젝트 멤버 삭제
router.delete('/:memberId', async (req, res) => {
  try {
    const member = await ProjectMember.findByPk(req.params.memberId);

    if (!member) {
      return res.status(404).json({ message: '멤버를 찾을 수 없습니다.' });
    }

    const admins = await ProjectMember.findAll({
      where: {
        project_id: member.project_id,
        user_id: req.user.id,
        role: 'admin'
      }
    });

    if (admins.length === 0) {
      return res.status(403).json({ 
        message: '프로젝트 멤버 삭제 권한이 없습니다.' 
      });
    }

    const result = await ProjectMember.destroy({
      where: { id: req.params.memberId }
    });
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '삭제할 멤버를 찾을 수 없습니다.' });
    }
    
    res.json({ message: '멤버가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '멤버 삭제 실패', error: error.message });
  }
});

export default router;

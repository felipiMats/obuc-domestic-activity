import express from 'express';
import { createTask, updateTask, getTasks, getTaskById, deleteTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// POST - new task
router.post('/tasks', authenticate, createTask);

// PUT - update task
router.put('/tasks/:id', authenticate, updateTask);

// GET - get tasks, option status
router.get('/tasks', authenticate, getTasks);

// GET - get task by id
router.get('/tasks/:id', authenticate, getTaskById);

// DELETE - delete task by id
router.delete('/tasks/:id', authenticate, deleteTask);

export default router;

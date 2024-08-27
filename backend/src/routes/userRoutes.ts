import express from 'express';
import { register, login } from '../controllers/userController';

const router = express.Router();

// POST - user register
router.post('/register', register);

// POST - user login
router.post('/login', login);

export default router;

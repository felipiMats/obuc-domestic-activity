import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/UserService';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const user = await registerUser({ email, name, password });
    const token = jwt.sign({ id: user?.id, email: user?.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(201).json({
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
      },
      token,
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

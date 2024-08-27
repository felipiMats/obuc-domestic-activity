import { Request, Response } from 'express';
import { addTask, modifyTask, fetchTasks, fetchTaskById, removeTask } from '../services/taskService';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name, userId, description } = req.body;
    await addTask({ name, userId, description });
    res.status(201).json({ message: 'Task created' });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, userId, description, status } = req.body;
    await modifyTask(Number(id), { name, userId, description, status });
    res.json({ message: 'Task updated' });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const tasks = await fetchTasks(status as string);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await fetchTaskById(Number(id));
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await removeTask(Number(id));
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

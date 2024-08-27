import { db } from '../utils/database';

export interface Task {
  id?: number;
  name: string;
  userId: number;
  description: string;
  status?: 'não iniciada' | 'em andamento' | 'concluída';
}

export const createTask = async (task: Task) => {
  const { name, userId, description, status = 'não iniciada' } = task;
  await (await db).run(
    'INSERT INTO tasks (name, userId, description, status) VALUES (?, ?, ?, ?)',
    [name, userId, description, status]
  );
};

export const updateTask = async (id: number, task: Task) => {
  const { name, userId, description, status } = task;
  const existingTask = await (await db).get('SELECT * FROM tasks WHERE id = ?', [id]);

  if (existingTask.status === 'concluída') {
    throw new Error('Completed tasks cannot be edited');
  }

  await (await db).run(
    'UPDATE tasks SET name = ?, userId = ?, description = ?, status = ? WHERE id = ?',
    [name, userId, description, status, id]
  );
};

export const getTasks = async (status?: string) => {
  return status
    ? await (await db).all('SELECT * FROM tasks WHERE status = ?', [status])
    : await (await db).all('SELECT * FROM tasks');
};

export const getTaskById = async (id: number) => {
  return await (await db).get('SELECT * FROM tasks WHERE id = ?', [id]);
};

export const deleteTask = async (id: number) => {
  await (await db).run('DELETE FROM tasks WHERE id = ?', [id]);
};

import { TaskDTO } from '../dtos/TaskDTO';
import { db } from '../utils/database';

export const createTask = async (task: TaskDTO) => {
  const { name, userName, description, status = 'não iniciada' } = task;
  await (await db).run(
    'INSERT INTO tasks (name, userName, description, status) VALUES (?, ?, ?, ?)',
    [name, userName, description, status]
  );
};

export const updateTask = async (id: number, task: TaskDTO) => {
  const { name, userName, description, status } = task;
  const existingTask = await (await db).get('SELECT * FROM tasks WHERE id = ?', [id]);

  if (existingTask.status === 'concluída') {
    throw new Error('Completed tasks cannot be edited');
  }

  await (await db).run(
    'UPDATE tasks SET name = ?, userName = ?, description = ?, status = ? WHERE id = ?',
    [name, userName, description, status, id]
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

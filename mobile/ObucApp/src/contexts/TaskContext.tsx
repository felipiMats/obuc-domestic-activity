import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '@services/api';
import { TaskDTO } from '@dtos/TaskDTO';
import { useAuth } from '@hooks/AuthContext';

export type TaskContextDataProps = {
  tasks: TaskDTO[];
  isLoadingTasks: boolean;
  createTask: (name: string, userName: string, description: string) => Promise<void>;
  updateTask: (id: number, name: string, userName: string, description: string, status?: string) => Promise<void>;
  fetchTasks: (status?: string) => Promise<void>;
  fetchTaskById: (id: number) => Promise<TaskDTO | null>;
  deleteTask: (id: number) => Promise<void>;
}

type TaskContextProviderProps = {
  children: ReactNode;
}

export const TaskContext = createContext<TaskContextDataProps>({} as TaskContextDataProps);

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  async function createTask(name: string, userName: string, description: string) {
    try {
      setIsLoadingTasks(true);
      await api.post('/tasks', { name, userName, description });
      await fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsLoadingTasks(false);
    }
  }

  async function updateTask(id: number, name: string, userName: string, description: string, status?: string) {
    try {
      setIsLoadingTasks(true);
      await api.put(`/tasks/${id}`, { name, userName, description, status });
      await fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsLoadingTasks(false);
    }
  }

  async function fetchTasks(status?: string) {
    try {
      setIsLoadingTasks(true);
      const response = await api.get('/tasks', { params: { status } });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoadingTasks(false);
    }
  }

  async function fetchTaskById(id: number) {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      return null;
    }
  }

  async function deleteTask(id: number) {
    try {
      setIsLoadingTasks(true);
      await api.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsLoadingTasks(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <TaskContext.Provider value={{ tasks, isLoadingTasks, createTask, updateTask, fetchTasks, fetchTaskById, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

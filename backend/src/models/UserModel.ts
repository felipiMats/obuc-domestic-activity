import { db } from '../utils/database';

export interface User {
  id?: number;
  email: string;
  name: string;
  password: string;
}

export const createUser = async (user: User) => {
  const stmt = await (await db).prepare('INSERT INTO users (email, name, password) VALUES (?, ?)');
  stmt.bind([user.email, user.name, user.password]);
  return stmt.run();
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const stmt = await (await db).prepare('SELECT * FROM users WHERE email = ?');
  stmt.bind([email]);
  return stmt.get();
};

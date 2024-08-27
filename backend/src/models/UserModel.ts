import { UserDTO } from '../dtos/UserDTO';
import { db } from '../utils/database';

export const createUser = async (user: UserDTO) => {
  const stmt = await (await db).prepare('INSERT INTO users (email, name, password) VALUES (?, ?, ?)');
  stmt.bind([user.email, user.name, user.password]);
  return stmt.run();
};

export const findUserByEmail = async (email: string): Promise<UserDTO | undefined> => {
  const stmt = await (await db).prepare('SELECT * FROM users WHERE email = ?');
  stmt.bind([email]);
  return stmt.get();
};

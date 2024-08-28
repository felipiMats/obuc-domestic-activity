import { UserDTO } from '../dtos/UserDTO';
import { createUser, findUserByEmail } from '../models/UserModel';
import bcrypt from 'bcryptjs';

export const registerUser = async (user: UserDTO) => {
  const existingUser = await findUserByEmail(user.email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await createUser({ ...user, password: hashedPassword });

  return findUserByEmail(user.email);
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return user;
};

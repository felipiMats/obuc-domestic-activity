import express from 'express';
import { db } from './utils/database';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const initializeDatabase = async () => {
  try {
    const connection = await db;
    await connection.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        name TEXT,
        password TEXT
      );
    `);
    await connection.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        userId INTEGER,
        description TEXT,
        status TEXT CHECK(status IN ('não iniciada', 'em andamento', 'concluída')),
        FOREIGN KEY(userId) REFERENCES users(id)
      );
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

const startServer = () => {
  app.use(userRoutes);
  app.use(taskRoutes);

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
};

initializeDatabase().then(startServer);

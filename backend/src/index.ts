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
        userName TEXT,
        description TEXT,
        status TEXT CHECK(status IN ('não iniciada', 'em andamento', 'concluída'))
      );
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

const startServer = () => {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', taskRoutes);

  const port = parseInt(process.env.PORT || '3000', 10);
  const hostname = '0.0.0.0';

  app.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}/api/v1`);
  });
};

initializeDatabase().then(startServer);

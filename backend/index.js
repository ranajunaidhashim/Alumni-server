import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import adminRouter from './routes/admin.routes.js';
import errorHandler from './middlewares/error.middleware.js';

dotenv.config();

const app = express();

// CORS setup
const CLIENT_ORIGINS = [
  'http://localhost:5173',
  'https://alumni-client.vercel.app'
];
app.use(cors({ origin: CLIENT_ORIGINS, methods: ['GET','POST','PUT','PATCH','DELETE'], credentials: true }));
app.options('*', cors({ origin: CLIENT_ORIGINS, credentials: true }));

// Built‑in middlewares
app.use(express.json());
app.use(cookieParser());

// Static assets
app.use('/api/admin/public', express.static(path.join(process.cwd(), 'Public')));

// API routes
app.use('/auth', authRouter);
app.use('/api/admin', adminRouter);

// Health‑check / root
app.get('/', (req, res) => res.send('Hello from Alumni Server!'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route Not Found' });
});

// Central error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || process.env.DB_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

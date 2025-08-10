import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import authRouter from './routes/auth.js';
import lawyerRouter from './routes/lawyers.js';
import bookingRouter from './routes/bookings.js';
import reviewRouter from './routes/reviews.js';
import messageRouter from './routes/messages.js';
import paymentRouter from './routes/payments.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/lawyers', lawyerRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/messages', messageRouter);
app.use('/api/payments', paymentRouter);

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('join', (roomId) => socket.join(roomId));
  socket.on('message', (payload) => {
    io.to(payload.roomId).emit('message', payload);
  });
});

const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./configs/db');
const usersRouter = require('./controllers/personsController');

const app = express();
const server = http.createServer(app); // יצירת שרת HTTP
const io = new Server(server, {
  cors: {
    origin: '*', // אפשר להתאים לפי הצורך
    methods: ['GET', 'POST']
  }
});

const PORT = 3000;

// חיבור למסד הנתונים
connectDB();

// אמצעי עזר
app.use(cors());
app.use('/', express.json());
app.use('/users', usersRouter);

// חיבור socket.io
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

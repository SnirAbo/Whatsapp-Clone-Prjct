const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./configs/db');
const usersRouter = require('./controllers/userController');
const messageRouter = require('./controllers/messageController');
const groupRouter = require('./controllers/groupController');
const authRouter = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware');
const axios = require('axios');

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT']
  }
});

const PORT = 3000;

// חיבור למסד הנתונים
connectDB();

// אמצעי עזר
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT'],
allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
}));
app.use('/', express.json());
app.use('/users', authMiddleware ,usersRouter); // V
app.use('/messages', authMiddleware ,messageRouter); // V 
app.use('/groups', authMiddleware , groupRouter); // V
app.use('/auth', authRouter); // V

app.get('/', (req, res) => {
  res.send('Server is running');
});


// חיבור socket.io
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join', (id) => {
    socket.join(id); 
  });

  socket.on('sendMessage', (message) => {
    // שומר ל-DB
    axios.post('http://localhost:3000/messages', message)
      .then(response => {
        console.log('Message saved:', response.data);
      })
      .catch(error => {
        console.error('Error saving message:', error);
      });

    const target = message.isGroupMessage ? message.receiverGroup : message.receiverUser;
    socket.to(target).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

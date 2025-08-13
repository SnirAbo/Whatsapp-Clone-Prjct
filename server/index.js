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
    socket.join(socket.id)
  });

  socket.on('sendMessage', (message, token) => {
  axios.post('http://localhost:3000/messages', message, {
    headers: {
      'x-access-token': token,
    },
  })
  .then((response) => {
    console.log('Message saved:', response.data);

    const targetRoom = message.isGroupMessage
      ? message.receiverGroup
      : message.receiverUser;
      
    io.to(message.sender).to(targetRoom).emit('receiveMessage', message);
  })
  .catch((error) => {
    console.error('Error saving message:', error);
  });
});

  socket.on('blockUser', (targetedId, userId, token) => {
    axios.put('http://localhost:3000/users/block', {
      targetedId,
      userId
    }, {
      headers: { 
        'x-access-token': token
      }
    })
    .then(response => {
      console.log('User blocked:', response.data);
    })
    .catch(error => {
      console.error('Error blocking user:', error);
    });
  });

  socket.on('unblockUser', (targetedId, userId, token) => {
    axios.put('http://localhost:3000/users/unblock', {
      targetedId,
      userId
    }, {
      headers: { 
        'x-access-token': token
      }
    })
    .then(response => {
      console.log('User unblocked:', response.data);
    })
    .catch(error => {
      console.error('Error unblocking user:', error);
    });
  });

    // Listen for userJoinedGroup event
  socket.on('userJoinedGroup', (targetedId, userId, token) => {
    axios.put('http://localhost:3000/users/join-group', {
      targetedId,
      userId
    }, {
      headers: { 
        'x-access-token': token
      }
    })
    .then(response => {
      console.log(`User ${userId} joined group ${targetedId}`);
    })
    .catch(error => {
      console.error('Error blocking user:', error);
    });
  });

  // Listen for userLeftGroup event
  socket.on('userLeftGroup', (targetedId, userId, token) => {
    axios.put('http://localhost:3000/users/leave-group', {
      targetedId,
      userId
    }, {
      headers: { 
        'x-access-token': token
      }
    })
    .then(response => {
      console.log(`User ${userId} left group ${targetedId}`);
    })
    .catch(error => {
      console.error('Error blocking user:', error);
    });
  });

   socket.on('createGroup', (name, token) => {
    axios.post('http://localhost:3000/groups', {
      name,
    }, {
      headers: { 
        'x-access-token': token
      }
    })
    .then(response => {
      console.log(`User ${userId} created group ${name}`);
    })
    .catch(error => {
      console.error('Error blocking user:', error);
    });
  });


  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

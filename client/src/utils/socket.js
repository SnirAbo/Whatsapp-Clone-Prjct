// socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  auth: {
    token: sessionStorage.getItem('token'),
  }
});

export default socket;
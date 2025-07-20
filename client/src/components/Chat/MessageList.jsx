import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import socket from '../../utils/socket'; // << חשוב

const MessageListComp = () => {
  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const [messages, setMessages] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPrivateMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/messages/chat', {
          params: {
            userA: decoded.id,
            userB: userId,
          },
          headers: {
            'x-access-token': token,
          },
        });

        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error('Expected array but got:', response.data);
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchPrivateMessages();
  }, [userId, decoded.id, token]);

  useEffect(() => {
    socket.emit('join', decoded.id);

    socket.on('receiveMessage', (newMessage) => {
      if (
        newMessage.sender === userId ||
        newMessage.receiverUser === userId
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId, decoded.id]);

  const ShowPrivateMessages = () => {
    if (messages.length === 0) {
      return <Typography>No messages yet.</Typography>;
    }
    return messages.map((msg, idx) => (
      <Paper key={idx} sx={{ p: 2, mb: 1 }}>
        <Typography>{msg.content}</Typography>
      </Paper>
    ));
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Messages</Typography>
      <ShowPrivateMessages />
    </Box>
  );
};

export default MessageListComp;

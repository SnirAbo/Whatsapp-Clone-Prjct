import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import socket from '../../../utils/socket'; // << חשוב

const PMessageListComp = () => {
  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const [messages, setMessages] = useState([]);
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const currentUser = users.find(user => user._id === decoded.id);
  const targetedUser = users.find(user => user._id === userId);

      useEffect(() => {
    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3000/users', {
            headers: { 
                'x-access-token': token
            }
        });
        setUsers(response.data);
    }
    fetchUsers();
      }, [token]);


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
  }, [userId]);

  useEffect(() => {
    socket.emit('join', decoded.id);

    socket.on('receiveMessage', (newMessage) => {
      if (
        (newMessage.sender === decoded.id && newMessage.receiverUser === userId) ||
        (newMessage.sender === userId && newMessage.receiverUser === decoded.id)
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
    if(targetedUser.blockedUsers?.includes(currentUser._id) ||
    currentUser.blockedUsers?.includes(targetedUser._id)) {
      return <Typography>You have blocked this user.</Typography>;
    }
  return messages.map((msg, idx) => {
  const isMine = msg.sender._id === decoded.id;
  return (

    <Box key={idx} sx={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
      <Paper

        sx={{
          p: 1,
          mb: 1,
          maxWidth: '60%',
          backgroundColor: isMine ? '#dcf8c6' : '#ffffff',
        }}
      >
        <Typography>
          {msg.sender.displayName}:
        </Typography>
        <Typography>{msg.content}</Typography>
      </Paper>
    </Box>
  );
});
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Messages</Typography>
      <ShowPrivateMessages />
    </Box>
  );
};

export default PMessageListComp;

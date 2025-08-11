import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import socket from '../../../utils/socket'; // << חשוב

const GroupMessageListComp = () => {
  const token = sessionStorage.getItem('token');
  const [messages, setMessages] = useState([]);
  const { groupId } = useParams();
    const decoded = jwtDecode(token);
  
  useEffect(() => {
    const fetchGroupMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/messages/group', {
          params: {
            groupId: groupId,
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

    fetchGroupMessages();
  }, [groupId, token]);

  useEffect(() => {
    socket.emit('join', groupId);

    socket.on('receiveMessage', (newMessage) => {
      if (
        (newMessage.receiverGroup === groupId && newMessage.isGroupMessage) 
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });
    
    return () => {
      socket.off('receiveMessage');
    };
  }, [groupId]);

  const ShowGroupMessages = () => {
    if (messages.length === 0) {
      return <Typography>No messages yet.</Typography>;
    }
    
  return messages.map((msg, idx) => {
  
  const isMine = msg.sender === decoded.id;
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
        <Typography>
         {msg.content}
          </Typography>
      </Paper>
    </Box>
  );
});
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Messages</Typography>
      <ShowGroupMessages />
    </Box>
  );
};

export default GroupMessageListComp;

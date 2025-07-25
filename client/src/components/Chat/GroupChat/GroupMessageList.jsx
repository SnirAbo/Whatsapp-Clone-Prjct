import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import socket from '../../../utils/socket'; // << חשוב

const GroupMessageListComp = () => {
  const token = sessionStorage.getItem('token');
  const [messages, setMessages] = useState([]);
  const { groupId } = useParams();
  
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
    return messages.map((msg, index) => (
      <Paper key={index} sx={{ p: 2, mb: 1 }}>
        <Typography>{msg.content}</Typography>
      </Paper>
    ));
  };

  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Messages</Typography>
      <ShowGroupMessages />
    </Box>
  );
};

export default GroupMessageListComp;

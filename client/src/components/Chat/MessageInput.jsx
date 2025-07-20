import {useState, useEffect} from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import socket from '../../utils/socket';

const MessageInputComp = () => {
    const token = sessionStorage.getItem('token');
    const decoded = jwtDecode(token);
    const { userId, groupId } = useParams();

    const [privateMessage, setPrivateMessage] = useState({
    sender: decoded._id,
    receiverUser: userId , 
    content: '',
    isGroupMessage: false,
  });

    const [groupMessage, setGroupMessage] = useState({
    sender: decoded._id,
    receiverGroup: groupId, 
    content: '',
    isGroupMessage: true,
  });

     useEffect(() => {
      
     }, []);
    
      const handleSubmit = () => {
        
     }
return (
    <>
          <Box onClick={handleSubmit} sx={{ display: 'flex', p: 2, borderTop: '3px solid black' , width: '235%' }}>
            <TextField fullWidth placeholder="Type a message..." sx={{ mr: 1 }} />
            <Button variant="contained">Send</Button>
          </Box>
    </>
 );
}

export default MessageInputComp;

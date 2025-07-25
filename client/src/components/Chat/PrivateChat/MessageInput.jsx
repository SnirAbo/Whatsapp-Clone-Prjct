import {useState, useEffect} from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import socket from '../../../utils/socket';

const PMessageInputComp = () => {
    const token = sessionStorage.getItem('token');
    const decoded = jwtDecode(token);
    const { userId } = useParams();

    const [privateMessage, setPrivateMessage] = useState({
    sender: decoded.id,
    receiverUser: userId , 
    content: '',
    isGroupMessage: false,
  });

  useEffect(() => {
  setPrivateMessage((prev) => ({
    ...prev,
    receiverUser: userId,
  }));
}, [userId]);

      const handleSubmit = async () => {
       socket.emit('sendMessage' , privateMessage , token);
     }
return (
    <>
              <Box sx={{ display: 'flex', p: 2, borderTop: '3px solid black' }}>
            <TextField fullWidth placeholder="Type a message..." onChange={(e) => setPrivateMessage((prev) => ({ ...prev, content: e.target.value }))} sx={{ mr: 1 }} />
            <Button onClick={handleSubmit} variant="contained">Send</Button>
          </Box>
    </>
 );
}

export default PMessageInputComp;

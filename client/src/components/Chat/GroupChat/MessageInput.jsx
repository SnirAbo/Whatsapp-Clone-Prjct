import {useState, useEffect} from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import socket from '../../../utils/socket';

const MessageInputComp = () => {
    const token = sessionStorage.getItem('token');
    const decoded = jwtDecode(token);
    const { groupId } = useParams();

        const [groupMessage, setGroupMessage] = useState({
    sender: decoded._id,
    receiverGroup: groupId, 
    content: '',
    isGroupMessage: true,
  });
    

  useEffect(() => {
  setGroupMessage((prev) => ({
    ...prev,
    receiverGroup: groupId,
  }));
}, [groupId]);

      const handleSubmit = async () => {
       socket.emit('sendMessage' , groupMessage , token);
     }
return (
    <>
              <Box sx={{ display: 'flex', p: 2, borderTop: '3px solid black' , width: '205%' }}>
            <TextField fullWidth placeholder="Type a message..." onChange={(e) => setGroupMessage((prev) => ({ ...prev, content: e.target.value }))} sx={{ mr: 1 }} />
            <Button onClick={handleSubmit} variant="contained">Send</Button>
          </Box>
    </>
 );
}

export default MessageInputComp;

import { Paper, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';


const ChatHeaderComp = () => {
const token = sessionStorage.getItem('token');
const { userId } = useParams();
const [users, setUsers] = useState([]);
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

return (
    <>
    <Paper sx={{ p: 2 , width: '100%' }}>
       <Typography variant="h6">Chat with {targetedUser?.displayName}</Typography>
    </Paper>
    </>
 );
}

export default ChatHeaderComp;

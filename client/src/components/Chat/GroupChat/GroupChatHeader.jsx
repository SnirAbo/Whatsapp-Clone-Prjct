import { Paper, Typography, Box , Button} from '@mui/material';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import socket from '../../../utils/socket';
import { jwtDecode } from 'jwt-decode';

const GroupChatHeaderComp = () => {
const token = sessionStorage.getItem('token');
const decoded = jwtDecode(token);
const currentUser = decoded.id;
const { groupId } = useParams();
const [groups, setGroups] = useState([]);
const targetedGroup = groups.find(group => group._id === groupId); 
    useEffect(() => {
    const fetchGroups = async () => {
        const response = await axios.get('http://localhost:3000/groups', {
            headers: { 
                'x-access-token': token
            }
        });
        setGroups(response.data);
    }
    fetchGroups();
      }, [token]);

    const leaveGroup = (targetedId , userId , token) => {
        socket.emit('userLeftGroup', targetedId, userId, token);
        alert(`You have left the group ${targetedGroup?.name}`);
    }

return (
    <>
    <Paper sx={{ p: 2 , width: '100%' }}>
       <Typography variant="h6">Chat with {targetedGroup?.name}</Typography>
       <Button variant='contained' color='primary' onClick={() => leaveGroup(groupId, currentUser , token)}>Leave Group</Button>
    </Paper>
    </>
 );
}

export default GroupChatHeaderComp;

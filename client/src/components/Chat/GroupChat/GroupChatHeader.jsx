import { Paper, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';



const GroupChatHeaderComp = () => {
const token = sessionStorage.getItem('token');
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

return (
    <>
    <Paper sx={{ p: 2 , width: '100%' }}>
       <Typography variant="h6">Chat with {targetedGroup?.name}</Typography>
    </Paper>
    </>
 );
}

export default GroupChatHeaderComp;

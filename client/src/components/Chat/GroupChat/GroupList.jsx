import axios from 'axios';
import {useState, useEffect} from 'react';
import { Typography, Box, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import socket from '../../../utils/socket';

const GroupListComp = () => {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

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
      
      const handleClick = (groupId) => {
        return () => {
            navigate(`/chat/group/${groupId}`);
        }
      }

    const currentUser = users.find(user => user._id === jwtDecode(token).id);
    const userGroupIds = currentUser?.groups?.map(g => g._id?.toString?.() || g); 
    const joinedGroups = groups.filter(group => userGroupIds?.includes(group._id));
    const unjoinedGroups = groups.filter(group => !userGroupIds?.includes(group._id));

      const createGroup = (name , token) => {
        socket.emit('createGroup', name, token);
        alert(`You have created a group named ${name}`);
      }
      
      
return ( 
    <>
<Box sx={{ p: 2 }}>
    <Typography variant="h6">Your Groups</Typography>
    {joinedGroups.map((group, index) => (
        <Card key={index} sx={{ p: 1, mb: 1, transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            <CardActionArea onClick={handleClick(group._id)}>
                        <CardContent>
            <Typography>{group.name}</Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    ))}
    <Button variant='contained' color='primary' onClick={() => createGroup(prompt('Enter group name'), token)}>Create Group</Button>
    <Typography variant="h6" sx={{ mt: 2 }}>Available Groups</Typography>
    {unjoinedGroups.map((group, index) => (
        <Card key={index} sx={{ p: 1, mb: 1, transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#f0f0f0' } }}>
                <CardContent>
                    <Typography>{group.name}</Typography>
                    <Button variant='contained' color='primary' onClick={() => socket.emit('userJoinedGroup', group._id, jwtDecode(token).id, token)}>Join Group</Button>
                </CardContent>
        </Card>
    ))}
</Box>
    </>
 );
}

export default GroupListComp;

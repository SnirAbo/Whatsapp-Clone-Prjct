import axios from 'axios';
import {useState, useEffect} from 'react';
import { Typography, Box, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserListComp from '../PrivateChat/UserList';
import { jwtDecode } from 'jwt-decode';



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
    const filteredGroups = groups.filter(group => userGroupIds?.includes(group._id));

 
      
return (
    <>
<Box sx={{ p: 2 }}>
    {filteredGroups.map((group, index) => (
        <Card key={index} sx={{ p: 1, mb: 1, transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            <CardActionArea onClick={handleClick(group._id)}>
                        <CardContent>
            <Typography>{group.name}</Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    ))}
</Box>
    </>
 );
}

export default GroupListComp;

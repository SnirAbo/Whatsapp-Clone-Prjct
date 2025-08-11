import axios from 'axios';
import {useState, useEffect} from 'react';
import { Typography, Box, Card, CardContent, CardActionArea , Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import socket from '../../../utils/socket';


const UserListComp = () => {
    const [users, setUsers] = useState([]);
    const token = sessionStorage.getItem('token');
    const decoded = jwtDecode(token);
    const currentUser = users.find(user => user._id === decoded.id);
    const filteredUsers = users.filter(user => user._id !== currentUser._id);
    const navigate = useNavigate();
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

      const handleClick = (userId) => {
        return () => {
            navigate(`/chat/user/${userId}`);
        }
      }

      const BlockUser = async (targetedId , targetedUser) => {
       socket.emit('blockUser' , targetedId , decoded.id , token);
        alert(`You have blocked ${targetedUser}`);
      }
      
      const unBlockUser = async (targetedId , targetedUser) => {
        socket.emit('unblockUser' , targetedId , decoded.id , token);
        alert(`You have unblocked ${targetedUser}`);

      }
      
      
return (
    <>
<Box sx={{ p: 2 }}>
    {filteredUsers.map((user, index) => (
        <Card key={index} sx={{ p: 1, mb: 1, transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            <CardActionArea onClick={handleClick(user._id)}>
            <CardContent>
                    <Typography>{user.displayName}</Typography>
            </CardContent>
            </CardActionArea>
              <Button variant='contained' color='error' onClick={() => BlockUser(user._id, user.displayName)}> Block </Button>
              &nbsp;&nbsp;
              <Button variant='contained' color='success' onClick={() => unBlockUser(user._id, user.displayName)}> unBlock </Button>
        </Card>
    ))}
</Box>
    </>
 );
}

export default UserListComp;

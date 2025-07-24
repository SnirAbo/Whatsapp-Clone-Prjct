import axios from 'axios';
import {useState, useEffect} from 'react';
import { Typography, Box, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const UserListComp = () => {
    const [users, setUsers] = useState([]);
    const token = sessionStorage.getItem('token');
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
            navigate(`/chat/${userId}`);
        }
      }
      
return (
    <>
<Box sx={{ p: 2 }}>
    {users.map((user, index) => (
        <Card key={index} sx={{ p: 1, mb: 1, transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#f0f0f0' } }}>
            <CardActionArea onClick={handleClick(user._id)}>
                        <CardContent>
            <Typography>{user.displayName}</Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    ))}
</Box>
    </>
 );
}

export default UserListComp;

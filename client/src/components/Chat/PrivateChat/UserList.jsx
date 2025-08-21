import axios from 'axios';
import {useState, useEffect} from 'react';
import { Typography, Box, Card, CardContent, CardActionArea , Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import socket from '../../../utils/socket';


const UserListComp = () => {
    const [users, setUsers] = useState([]);
    const [lastMessages, setLastMessages] = useState([]);
    const token = sessionStorage.getItem('token');
    const decoded = jwtDecode(token);
    const currentUser = users.find(user => user._id === decoded.id);
    const currentUserId = decoded?.id;
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
    
      
    useEffect(() => {
    const lastMessages = async () => {
        const response = await axios.get(`http://localhost:3000/messages/${decoded.id}`, {
            headers: { 
                'x-access-token': token
            }
        });
        setLastMessages(response.data);
    }
    lastMessages();
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
      const HistoryList = () => {
			if (!lastMessages || lastMessages.length === 0) {
				return <Typography>No recent conversations</Typography>;
			}

			// Build a map of otherUserId -> latest message with that user
			const latestByUserId = new Map();
			for (const message of lastMessages) {
				const otherUserId = message.sender._id === currentUserId ? message.receiverUser._id : message.sender._id;
				const existing = latestByUserId.get(otherUserId);
				if (!existing || new Date(message.timestamp) > new Date(existing.timestamp)) {
					latestByUserId.set(otherUserId, message);
				}
			}

			// Convert to array, sort by newest first, and optionally cap to 20
			const uniqueConversations = Array.from(latestByUserId.values())
				.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
				.slice(0, 20);

			return (
				<>
				{uniqueConversations.map((message) => {
					const otherUserId = message.sender._id === currentUserId ? message.receiverUser._id : message.sender._id;
					const user = users.find(u => u._id === otherUserId);
					if (!user) return null;
					return (
						<Card key={otherUserId} sx={{ p: 1, mb: 1, transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#f0f0f0' } }}>
							<CardActionArea onClick={handleClick(user._id)}>
								<CardContent>
									<Typography>{user.displayName}</Typography>
									<Typography variant="body2" color="textSecondary">{message.content}</Typography>
								</CardContent>
							</CardActionArea>
							<Button variant='contained' color='error' onClick={() => BlockUser(user._id, user.displayName)}> Block </Button>
							&nbsp;&nbsp;
							<Button variant='contained' color='success' onClick={() => unBlockUser(user._id, user.displayName)}> unBlock </Button>
						</Card>
					);
				})}
				</>
			);
		}
    
return (
    <>
<Box sx={{ p: 2 }}>
    <Typography variant="h6">History List</Typography>
    <HistoryList/>
    <Typography variant="h6">Your Contacts</Typography>
    {filteredUsers.length === 0 && <Typography>No contacts available</Typography>}
    
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

import { Paper, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ChatHeaderComp = () => {
const { userId } = useParams();
return (
    <>
    <Paper sx={{ p: 2 , width: '100%' }}>
       <Typography variant="h6">Chat with {userId}</Typography>
    </Paper>
    </>
 );
}

export default ChatHeaderComp;

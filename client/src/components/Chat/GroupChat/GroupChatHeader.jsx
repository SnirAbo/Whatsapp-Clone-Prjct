import { Paper, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const GroupChatHeaderComp = () => {
const { groupId } = useParams();
return (
    <>
    <Paper sx={{ p: 2 , width: '100%' }}>
       <Typography variant="h6">Chat with {groupId}</Typography>
    </Paper>
    </>
 );
}

export default GroupChatHeaderComp;

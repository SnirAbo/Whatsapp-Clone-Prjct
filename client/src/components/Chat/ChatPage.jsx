import { Grid,Typography, Box } from '@mui/material';
import UserListComp from './PrivateChat/UserList';
import { Outlet } from 'react-router-dom';
import ChatHeaderComp from './ChatHeader';
import MessageInputComp from './PrivateChat/MessageInput';

const ChatPageComp = () => {
return (
    <>
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', // רקע בהיר
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: '1000px',
        height: '90vh',
        boxShadow: 3,
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#e0f7e9 ',
        display: 'flex',
      }}
    >
      <Grid container sx={{ height: '100%' }}>
        
        <Grid xs={3} sx={{ borderRight: '3px solid black', overflowY: 'auto', p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Chats</Typography>
          <UserListComp />
        </Grid>

        {/* צד ימין - הצ'אט עצמו */}
        <Grid xs={9} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ChatHeaderComp/>

          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {/* הודעות */}
            <Outlet />
          </Box>
          <MessageInputComp/>
        </Grid>
      </Grid>
    </Box>
  </Box>
    </>
 );
}

export default ChatPageComp;

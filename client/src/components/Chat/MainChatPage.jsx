import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import GroupListComp from './GroupChat/GroupList';
import UsersListComp from './PrivateChat/UserList';

const MainChatPageComp = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          height: '90vh',
          boxShadow: 3,
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: '#e0f7e9',
          display: 'flex',
        }}
      >
        {/* צד שמאל – רשימות */}
        <Box
          sx={{
            width: '30%',
            borderRight: '3px solid black',
            overflowY: 'auto',
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Chats
          </Typography>
          <UsersListComp />
          <GroupListComp />
        </Box>

        {/* צד ימין – Outlet (צ'אט) */}
        <Box
          sx={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainChatPageComp;

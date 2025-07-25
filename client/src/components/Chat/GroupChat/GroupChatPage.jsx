import { Grid,Typography, Box } from '@mui/material';

import ChatHeaderComp from './GroupChatHeader';
import MessageInputComp from './MessageInput';
import GroupMessageList from './GroupMessageList'


const GroupChatPageComp = () => {
return (
    <>
<Box
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }}
>
  <ChatHeaderComp />
  <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
    <GroupMessageList />
  </Box>
  <MessageInputComp />
</Box>
    </>
 );
}

export default GroupChatPageComp;

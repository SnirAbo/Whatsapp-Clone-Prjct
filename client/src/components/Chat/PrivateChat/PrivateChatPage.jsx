import { Box } from '@mui/material';
import ChatHeaderComp from './PrivateChatHeader';
import MessageInputComp from './MessageInput';
import PrivateMessageList from './PrivateMessageList';

const PrivateChatPageComp = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <ChatHeaderComp />
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, width: '100%' }}>
        <PrivateMessageList />
      </Box>

      <Box sx={{ width: '100%' }}>
        <MessageInputComp />
      </Box>
    </Box>
  );
};

export default PrivateChatPageComp;

import {Box, Typography} from '@mui/material';

const ChatroomGreeting = () => {
  return (
    <Box sx={{ textAlign: 'center', width: '100%', px: 3, position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
      <Box sx={{ margin: '0 auto', maxWidth: '550px', }}>
        <img src='/chill.svg' alt='chat' style={{ width: '100%', maxWidth: '350px', }} />
        <Typography
          align='center'
          sx={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px auto', }}
        >
          Enjoy Your Time
        </Typography>
        <Typography
          align='center'
        >
          Share every best moment with friends and family by creating group chat while your messages will keep encrypted
        </Typography>
      </Box>
    </Box>
  );
}

export default ChatroomGreeting;

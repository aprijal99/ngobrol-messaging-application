import {Button} from '@mui/material';

const LoginOrChatroom = ({ text }: { text: string }) => {
  return (
    <Button
      variant='outlined' href={text === 'Chatroom' ? '/chatroom' : '/login'}
      sx={{
        color: 'white', fontSize: '1rem', textTransform: 'capitalize', borderColor: 'white',
        ':hover': { borderColor: 'white', },
      }}
    >
      {text}
    </Button>
  );
}

export default LoginOrChatroom;

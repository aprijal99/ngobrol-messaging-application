import {Avatar, Box, Typography} from '@mui/material';
import {GroupMessageType} from '../../../redux/slice/groupMessageSlice';

const GroupLeftMessage = ({ groupMessage, avatar = true }: { groupMessage: GroupMessageType, avatar?: boolean, }) => {
  return (
    <Box sx={{ pr: '100px', mb: .5, mt: avatar ? .5 : null, display: 'flex', }}>
      {avatar && <Avatar
        alt='Contact Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
      />}
      <Box
        sx={{
          px: 1.5, py: 1.2, ml: avatar ? .5 : '44px', borderRadius: '15px', display: 'inline-block', position: 'relative',
          borderTopLeftRadius: avatar ? 0 : null, backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        {avatar && <Typography sx={{ fontSize: '.9rem', color: 'rgb(205, 64, 115)', }}>{groupMessage.senderName}</Typography>}
        <Typography sx={{ maxWidth: '480px', lineHeight: '1.3rem', }}>{groupMessage.message}</Typography>
      </Box>
    </Box>
  );
}

export default GroupLeftMessage;

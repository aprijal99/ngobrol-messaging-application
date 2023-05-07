import {Box, Typography} from '@mui/material';
import {GroupType} from '../../../redux/slice/groupSlice';
import ProfileAvatar from '../ProfileAvatar';

const GroupList = ({ groupList }: { groupList: GroupType }) => {
  return (
    <Box
      sx={{
        p: 1, mx: -1, mb: .5, borderRadius: '10px',
        display: 'flex', cursor: 'pointer',
        ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
      }}
    >
      {groupList.imageUrl ? <ProfileAvatar imageUrl={`http://localhost:7080/image/${groupList.imageUrl}`} /> : <ProfileAvatar />}
      <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', justifyContent: 'center', }}>
        <Typography sx={{ fontWeight: 'bold', }} >{groupList.name}</Typography>
        <Typography sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', }} >{groupList.userNumber} members</Typography>
      </Box>
    </Box>
  );
}

export default GroupList;

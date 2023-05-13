import {Box, Typography} from '@mui/material';
import {GroupType} from '../../../redux/slice/groupSlice';
import ProfileAvatar from '../ProfileAvatar';
import {openMessageMenuAndChangeArrow} from './ChatList';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../redux/store/store';
import {changeActiveChat} from '../../../redux/slice/activeChatSlice';
import {changeToGroupChat} from '../../../functions/activeChat';
import {setGroupId} from '../../../redux/slice/sentMessageSlice';

const GroupList = ({ groupList }: { groupList: GroupType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClickGroupList = () => {
    openMessageMenuAndChangeArrow();

    dispatch(changeActiveChat(changeToGroupChat(groupList.groupId as number)));
    dispatch(setGroupId(groupList.groupId as number));
  }

  return (
    <Box
      onClick={handleClickGroupList}
      sx={{
        p: 1, mx: -1, mb: .5, borderRadius: '10px',
        display: 'flex', cursor: 'pointer',
        ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
      }}
    >
      {groupList.imageUrl ? <ProfileAvatar imageUrl={groupList.imageUrl} /> : <ProfileAvatar />}
      <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', justifyContent: 'center', }}>
        <Typography sx={{ fontWeight: 'bold', }} >{groupList.name}</Typography>
        <Typography sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', }} >{groupList.userNumber} members</Typography>
      </Box>
    </Box>
  );
}

export default GroupList;

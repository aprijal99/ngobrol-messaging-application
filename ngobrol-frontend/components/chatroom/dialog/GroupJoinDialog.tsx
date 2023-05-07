import React, {useState} from 'react';
import {addGroup, GroupType} from '../../../redux/slice/groupSlice';
import findGroup from '../../../functions/findGroup';
import {Alert, Avatar, Box, Button, IconButton, TextField, Typography} from '@mui/material';
import {ArrowBackIosNew, Close} from '@mui/icons-material';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import {ApiType} from '../../../types/api';

const GroupJoinDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();
  const { group } = useSelector((state: RootState) => state.group);
  const [joinGroup, setJoinGroup] = useState<GroupType | null | 'notFound'>(null);
  const [alert, setAlert] = useState(false);

  const handleClickFindGroup = () => {
    const groupUrlInput = document.getElementById('group-url-input') as HTMLInputElement;
    const groupId: string = groupUrlInput ? groupUrlInput.value.substring('https://n.group/'.length) : '';

    if(groupId !== '') {
      findGroup(groupId)
        .then(result => {
          if(result instanceof Error) throw new Error('Group not found')
          else setJoinGroup(result);
        })
        .catch(() => {
          setJoinGroup('notFound');
          setAlert(true);
        });
    }
  }

  const handleClickJoinGroup = () => {
    if(joinGroup !== null && joinGroup !== 'notFound') {
      const formBody: { [n: string]: any } = {
        userEmail: store.getState().user.user.email,
        groupChatId: joinGroup.groupId as number,
      }

      fetch('http://localhost:7080/group/assign-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formBody),
      })
        .then(fetchResult => fetchResult.json())
        .then((result: ApiType) => {
          if(result.code !== 201) throw new Error('Something went wrong');
          else dispatch(addGroup(joinGroup));
        })
        .catch(error => console.log(error));
    }
  }

  const handleClickNewGroupJoinBack = () => {
    const dialogContent = document.getElementById('dialog-content');
    const newGroup = document.getElementById('new-group');
    const newGroupJoin = document.getElementById('new-group-join');

    if(dialogContent && newGroup && newGroupJoin) {
      dialogContent.style.height = `${newGroup.offsetHeight}px`;
      newGroup.classList.remove('translate-x-minus-100-percent');
      newGroupJoin.style.left = '100%';
    }
  }

  return (
    <Box id='new-group-join' sx={{ px: 3, py: 4, position: 'absolute', left: '100%', minWidth: '100%', transition: 'left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms', }}>
      <IconButton onClick={handleClickNewGroupJoinBack} sx={{ position: 'absolute', top: '12px', left: '10px', zIndex: '100', }}>
        <ArrowBackIosNew sx={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.6)', }} />
      </IconButton>
      <Box>
        <Typography variant='h5' align='center' gutterBottom={true} sx={{ fontWeight: 'bold', }}>Join a Group</Typography>
        <Typography align='center' sx={{ fontWeight: '300', mx: 'auto', color: 'rgba(255, 255, 255, 0.6)', }}>
          Join a group of your friends or families by entering the group url
        </Typography>

        <Box display='flex' columnGap='10px' sx={{ mt: 4, mx: 'auto', }}>
          <TextField id='group-url-input' fullWidth label='Enter the group url' variant='outlined' autoComplete='nope' />
          <Button
            variant='contained' onClick={handleClickFindGroup}
            sx={{
              textTransform: 'capitalize', boxShadow: 'none', px: 3, fontSize: 'initial',
              ':hover': { backgroundColor: '#199bf1', boxShadow: 'none', },
            }}
          >
            Search
          </Button>
        </Box>

        {joinGroup && joinGroup !== 'notFound' && <Box sx={{ mt: 4, }}>
          <Typography align='center' sx={{ mb: .5, fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', }}>Found the following group</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.23)', }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
              <Avatar alt='Contact Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
            </Box>
            <Box sx={{ mr: 2, flexGrow: '1', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}>
              <Typography sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}>{joinGroup.name}</Typography>
              <Typography sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '.85rem', fontWeight: '300', color: 'rgba(255, 255, 255, 0.6)', }}>{joinGroup.userNumber} members</Typography>
            </Box>
            {group.some(g => g.groupId === joinGroup.groupId) ?
              <Button variant='outlined' size='small' color='error' sx={{ textTransform: 'capitalize', borderRadius: '20px', minWidth: '60px', ':hover': { backgroundColor: 'initial', }, }}>Leave</Button> :
              <Button variant='outlined' size='small' onClick={handleClickJoinGroup} sx={{ textTransform: 'capitalize', borderRadius: '20px', minWidth: '60px', ':hover': { backgroundColor: 'initial', }, }}>Join</Button>
            }
          </Box>
        </Box>}

        {(joinGroup === 'notFound' && alert) &&
          <Alert
            severity='error' variant='outlined' sx={{ mt: 2, }}
            action={
              <IconButton aria-label='close' color='inherit' size='small' onClick={() => setAlert(false)}>
                <Close fontSize='inherit' />
              </IconButton>
            }
          >
            Group not found
          </Alert>
        }
      </Box>
    </Box>
  );
}

export default GroupJoinDialog;

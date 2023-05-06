import {Box, Typography} from '@mui/material';
import {KeyboardArrowRight} from '@mui/icons-material';
import React from 'react';

const AddGroupDialog = () => {
  const handleClickNewGroupCreate = () => {
    const dialogContent = document.getElementById('dialog-content');
    const newGroup = document.getElementById('new-group');
    const newGroupCreate = document.getElementById('new-group-create');

    if(dialogContent && newGroup && newGroupCreate) {
      newGroup.classList.add('translate-x-minus-100-percent');
      newGroupCreate.style.left = '0';
    }

    const heightObserver = new ResizeObserver(entries => {
      if(dialogContent && newGroup && newGroup.classList.contains('translate-x-minus-100-percent')) {
        dialogContent.style.height = `${entries[0].contentRect.height + 64}px`;
      }
    });

    if(newGroupCreate) heightObserver.observe(newGroupCreate);
  }

  const handleClickNewGroupJoin = () => {
    const dialogContent = document.getElementById('dialog-content');
    const newGroup = document.getElementById('new-group');
    const newGroupJoin = document.getElementById('new-group-join');

    if(dialogContent && newGroup && newGroupJoin) {
      dialogContent.style.height = `${newGroupJoin.offsetHeight}px`;
      newGroup.classList.add('translate-x-minus-100-percent');
      newGroupJoin.style.left = '0';
    }

    const heightObserver = new ResizeObserver(entries => {
      if(dialogContent && newGroup && newGroup.classList.contains('translate-x-minus-100-percent')) {
        dialogContent.style.height = `${entries[0].contentRect.height + 64}px`;
      }
    });

    if(newGroupJoin) heightObserver.observe(newGroupJoin);
  }

  return (
    <Box id='new-group' sx={{ px: 3, py: 4, minWidth: '100%', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms', }}>
      <Typography variant='h5' align='center' gutterBottom={true} sx={{ fontWeight: 'bold', }}>Create or Join a Group</Typography>
      <Typography align='center' sx={{ fontWeight: '300', mx: 'auto', color: 'rgba(255, 255, 255, 0.6)', }}>
        Create a new group and add your contacts to it or join another group by using a url
      </Typography>

      <Box display='flex' flexDirection='column' rowGap='10px' justifyContent='center' sx={{ mt: 4, mx: 'auto', }}>
        <Box
          display='flex' onClick={handleClickNewGroupCreate}
          sx={{
            border: '1px solid rgba(255, 255, 255, 0.6)', borderRadius: '10px', p: '15px', cursor: 'pointer',
            ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
          }}
        >
          <Typography flexGrow='1' sx={{ fontWeight: '500', }}>Create a new group</Typography>
          <KeyboardArrowRight />
        </Box>
        <Box
          display='flex' onClick={handleClickNewGroupJoin}
          sx={{
            border: '1px solid rgba(255, 255, 255, 0.6)', borderRadius: '10px', p: '15px', cursor: 'pointer',
            ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
          }}
        >
          <Typography flexGrow='1' sx={{ fontWeight: '500', }}>Join a group</Typography>
          <KeyboardArrowRight />
        </Box>
      </Box>
    </Box>
  );
}

export default AddGroupDialog;

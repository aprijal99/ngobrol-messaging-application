import {
  Alert,
  Avatar,
  Box, Button, Checkbox, Chip, IconButton,
  Table, TableBody, TableCell,
  TableContainer, TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {AddAPhotoOutlined, ArrowBackIosNew, Close, KeyboardArrowRight} from '@mui/icons-material';
import React, {ReactNode, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {GroupType} from '../../../redux/slice/groupSlice';
import findGroup from '../../../functions/findGroup';

const NewGroup = () => {
  const handleClickNewGroupCreate = () => {
    const dialogContent = document.getElementById('dialog-content');
    const newGroup = document.getElementById('new-group');
    const newGroupCreate = document.getElementById('new-group-create');
    const newGroupCreateContainer = document.getElementById('new-group-create-container');

    if(dialogContent && newGroup && newGroupCreate && newGroupCreateContainer) {
      dialogContent.style.height = `${newGroupCreateContainer.offsetHeight + 64}px`;
      newGroup.classList.add('translate-x-minus-100-percent');
      newGroupCreate.style.left = '0';
    }

    const heightObserver = new ResizeObserver(entries => {
      if(dialogContent && newGroup && newGroup.classList.contains('translate-x-minus-100-percent')) {
        dialogContent.style.height = `${entries[0].contentRect.height + 64}px`;
      }
    });

    if(newGroupCreateContainer) heightObserver.observe(newGroupCreateContainer);
  }

  const handleClickNewGroupJoin = () => {
    const dialogContent = document.getElementById('dialog-content');
    const newGroup = document.getElementById('new-group');
    const newGroupJoin = document.getElementById('new-group-join');
    const newGroupJoinContainer = document.getElementById('new-group-join-container');

    if(dialogContent && newGroup && newGroupJoin && newGroupJoinContainer) {
      dialogContent.style.height = `${newGroupJoinContainer.offsetHeight + 64}px`;
      newGroup.classList.add('translate-x-minus-100-percent');
      newGroupJoin.style.left = '0';
    }

    const heightObserver = new ResizeObserver(entries => {
      if(dialogContent && newGroup && newGroup.classList.contains('translate-x-minus-100-percent')) {
        dialogContent.style.height = `${entries[0].contentRect.height + 64}px`;
      }
    });

    if(newGroupJoinContainer) heightObserver.observe(newGroupJoinContainer);
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

const CustomTableCell = ({ children, padding = 'none' }: { children: ReactNode, padding?: 'none' | 'normal' | 'checkbox' | undefined, }) => {
  return (
    <TableCell padding={padding} sx={{ borderBottom: 'none', }}>
      {children}
    </TableCell>
  );
}

const NewGroupCreate = () => {
  const { contact } = useSelector((state: RootState) => state.contact);
  const [addContacts, setAddContacts] = useState<{ name: string, email: string, }[]>([]);
  const [checked, setChecked] = useState<{ [n: string]: boolean }>({});

  useEffect(() => {
    contact.map(c => {
      checked[c.email] = false;
      setChecked(checked);
    });
  }, []);

  const handleClickNewGroupCreateBack = () => {
    const dialogContent = document.getElementById('dialog-content');
    const newGroup = document.getElementById('new-group');
    const newGroupCreate = document.getElementById('new-group-create');
    const newGroupCreateContainer = document.getElementById('new-group-create-container');

    if(dialogContent && newGroup && newGroupCreate && newGroupCreateContainer) {
      dialogContent.style.height = `${newGroup.offsetHeight}px`;
      newGroup.classList.remove('translate-x-minus-100-percent');
      newGroupCreate.style.left = '100%';
    }
  }

  return (
    <Box
      id='new-group-create'
      sx={{
        px: 3, py: 4, position: 'absolute', left: '100%', maxHeight: '100%', minWidth: '100%', overflow: 'hidden',
        transition: 'left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      <IconButton onClick={handleClickNewGroupCreateBack} sx={{ position: 'absolute', top: '12px', left: '10px', zIndex: '100', }}>
        <ArrowBackIosNew sx={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.6)', }} />
      </IconButton>
      <Box id='new-group-create-container'>
        <Typography variant='h5' align='center' gutterBottom={true} sx={{ fontWeight: 'bold', }}>Create a New Group</Typography>
        <Typography align='center' sx={{ fontWeight: '300', mx: 'auto', color: 'rgba(255, 255, 255, 0.6)', }}>
          Give the group a name and add at least one of your contact to it
        </Typography>

        <Box display='flex' flexDirection='column' rowGap='15px' justifyContent='center' sx={{ mt: 4, mx: 'auto', }}>
          <Box display='flex' columnGap='10px'>
            <Box
              display='flex' justifyContent='center' alignItems='center'
              sx={{
                px: 2, cursor: 'pointer', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.23)',
                ':hover': { borderColor: 'white', },
              }}
            >
              <AddAPhotoOutlined sx={{ color: 'rgba(255, 255, 255, 0.7)', }} />
            </Box>
            <TextField fullWidth label='Group name' variant='outlined' autoComplete='nope' />
          </Box>

          {/*<TextField fullWidth hiddenLabel placeholder='Search contacts' variant='standard' autoComplete='nope' size='small'*/}
          {/*           sx={{ 'input': { p: '10px', }, '.MuiInputBase-root:before': { borderBottomColor: '#575757', }, }} />*/}

          <Typography sx={{ fontSize: '1.2rem', fontWeight: '500', mb: -.5, mt: 2, }}>Add contacts</Typography>
          <TableContainer
            sx={{
              maxHeight: '300px',
              '::-webkit-scrollbar': { width: '5px', },
              '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
              ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, },
            }}
          >
            <Table>
              <TableBody>
                {contact.map((c, idx) =>
                  <TableRow
                    key={idx}
                    onClickCapture={() => {
                      const newChecked: { [n: string]: boolean } = { ...checked }
                      newChecked[c.email] = !checked[c.email];
                      setChecked(newChecked);

                      if(newChecked[c.email]) setAddContacts(prevState => [...prevState, { name: c.name, email: c.email }]);
                      else setAddContacts(prevState => [...(prevState.filter(val => val.email !== c.email))]);
                    }}
                    sx={{
                      cursor: 'pointer', 'td:first-of-type': { borderRadius: '10px 0 0 10px', }, 'td:last-of-type': { borderRadius: '0 10px 10px 0', },
                      ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
                    }}
                  >
                    <CustomTableCell padding='checkbox'>
                      <Checkbox disableRipple checked={checked[c.email] === undefined ? false : checked[c.email]} />
                    </CustomTableCell>
                    <CustomTableCell>
                      <Box sx={{ display: 'flex', p: .5, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
                          <Avatar alt='Contact Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
                        </Box>
                        <Box>
                          <Typography>{c.name}</Typography>
                          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Last seen 2 hours ago</Typography>
                        </Box>
                      </Box>
                    </CustomTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {addContacts.length !== 0 && <Box display='flex' flexWrap='wrap' gap='5px'>
            {addContacts.map((addContact, idx) =>
              <Chip
                key={idx}
                label={addContact.name}
                variant='outlined'
                color='primary'
                sx={{ maxWidth: '150px', }}
                onDelete={() => {
                  setAddContacts(prevState => [...(prevState.filter(val => val.email !== addContact.email))]);

                  const newChecked: { [n: string]: boolean } = { ...checked }
                  newChecked[addContact.email] = !checked[addContact.email];
                  setChecked(newChecked);
                }}
              />
            )}
          </Box>}

          <Button
            variant='contained'
            sx={{
              textTransform: 'capitalize', boxShadow: 'none', px: 3, fontSize: 'initial', mt: 1,
              ':hover': { backgroundColor: '#199bf1', boxShadow: 'none', },
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const NewGroupJoin = () => {
  const [joinGroup, setJoinGroup] = useState<GroupType | null | 'notFound'>(null);
  const [alert, setAlert] = useState(false);

  const handleClickFindGroup = () => {
    const groupUrlInput = document.getElementById('group-url-input') as HTMLInputElement;
    const groupId: string = groupUrlInput ? groupUrlInput.value.substring('https://n.group/'.length) : '';

    findGroup(groupId)
      .then(result => {
        if(result instanceof Error) throw new Error('Group not found')
        else setJoinGroup(result);
      })
      .catch(() => {
        setJoinGroup('notFound');
        setAlert(true);
      })
  }

  const handleClickNewGroupJoinBack = () => {
    const dialogContent = document.getElementById('dialog-content');
    const newGroup = document.getElementById('new-group');
    const newGroupJoin = document.getElementById('new-group-join');
    const newGroupJoinContainer = document.getElementById('new-group-join-container');

    if(dialogContent && newGroup && newGroupJoin && newGroupJoinContainer) {
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
      <Box id='new-group-join-container'>
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
            <Button variant='outlined' size='small' sx={{ textTransform: 'capitalize', borderRadius: '20px', minWidth: '60px', ':hover': { backgroundColor: 'initial', }, }}>Join</Button>
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

const NewGroupDialog = () => {
  return (
    <>
      <NewGroup />
      <NewGroupCreate />
      <NewGroupJoin />
    </>
  );
}

export default NewGroupDialog;

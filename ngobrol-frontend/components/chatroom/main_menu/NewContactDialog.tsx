import {Alert, Avatar, Box, Button, IconButton, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {UserType} from '../../../redux/slice/userSlice';
import findContact from '../../../functions/findContact';
import {Close} from '@mui/icons-material';

const NewContactDialog = () => {
  const [newContact, setNewContact] = useState<UserType | null | 'notFound'>(null);
  const [alert, setAlert] = useState(false);

  const handleClickFindNewContact = () => {
    const newContactInput = document.getElementById('new-contact-input') as HTMLInputElement;
    const newContactEmail: string = newContactInput ? newContactInput.value : '';

    findContact(newContactEmail)
      .then(result => {
        if(result instanceof Error) throw new Error('Contact not found');
        else setNewContact(result);
      })
      .catch(() => {
        setNewContact('notFound');
        setAlert(true);
      });
  }

  return (
    <Box sx={{ px: 3, py: 4, minWidth: '0' }}>
      <Typography variant='h5' align='center' gutterBottom={true} sx={{ fontWeight: 'bold', }}>Add a New Contact</Typography>
      <Typography align='center' sx={{ fontWeight: '300', mx: 'auto', color: 'rgba(255, 255, 255, 0.6)', }}>
        Find a new contact by searching using an email and enjoy a new way of interaction
      </Typography>

      <Box display='flex' columnGap='10px' sx={{ mt: 4, mx: 'auto', }}>
        <TextField id='new-contact-input' fullWidth label='Search by an email' variant='outlined' autoComplete='nope' />
        <Button
          variant='contained' onClick={handleClickFindNewContact}
          sx={{
            textTransform: 'capitalize', boxShadow: 'none', px: 3, fontSize: 'initial',
            ':hover': { backgroundColor: '#199bf1', boxShadow: 'none', },
          }}
        >
          Search
        </Button>
      </Box>

      {newContact && newContact !== 'notFound' && <Box sx={{ mt: 4, }}>
        <Typography align='center' sx={{ mb: .5, fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', }}>Found the following contact</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.23)', }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
            <Avatar alt='Contact Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          </Box>
          <Box sx={{ mr: 2, flexGrow: '1', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}>
            <Typography sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}>{newContact.name}</Typography>
            <Typography sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '.85rem', fontWeight: '300', color: 'rgba(255, 255, 255, 0.6)', }}>{newContact.email}</Typography>
          </Box>
          <Button variant='outlined' size='small' sx={{ textTransform: 'capitalize', borderRadius: '20px', minWidth: '60px', ':hover': { backgroundColor: 'initial', }, }}>Add</Button>
        </Box>
      </Box>}

      {(newContact === 'notFound' && alert) &&
        <Alert
          severity='error' variant='outlined' sx={{ mt: 2, }}
          action={
            <IconButton aria-label='close' color='inherit' size='small' onClick={() => setAlert(false)}>
              <Close fontSize='inherit' />
            </IconButton>
          }
        >
          Contact not found
        </Alert>
      }
    </Box>
  );
}

export default NewContactDialog;

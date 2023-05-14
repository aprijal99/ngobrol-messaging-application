import MainMenuTitle from './MainMenuTitle';
import SearchBar from './SearchBar';
import ScrollableContainer from '../ScrollableContainer';
import ContactList from './ContactList';
import {PersonAddAlt1Outlined} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {Box, IconButton} from '@mui/material';
import React, {useState} from 'react';
import AddContactDialog from '../dialog/AddContactDialog';
import DialogContainer from '../dialog/DialogContainer';

const NewContactButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpenDialog = () => setOpen(true);
  const handleClickCloseDialog = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleClickOpenDialog} sx={{ cursor: 'pointer', }}>
        <PersonAddAlt1Outlined />
      </IconButton>
      <DialogContainer open={open} handleClickCloseDialog={handleClickCloseDialog}>
        <AddContactDialog />
      </DialogContainer>
    </>
  );
}

const Contact = () => {
  const { contact } = useSelector((state: RootState) => state.contact);
  const sortedContact = [...contact].sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  return (
    <>
      <MainMenuTitle title='Contacts' addIcon={<NewContactButton />} />
      <SearchBar placeholder='Search or make a new contact' />
      <ScrollableContainer reducedHeight='130px'>
        {contact.length > 0 ?
          sortedContact.map((c) => <ContactList key={c.email} name={c.name} status={c.status} email={c.email} imageUrl={c.imageUrl} />) :
          <Box position='absolute' left='50%' top='50%' sx={{ transform: 'translate3d(-50%, -50%, 0)', color: 'rgba(255, 255, 255, 0.6)', }}>
            There is no any contact
          </Box>
        }
      </ScrollableContainer>
    </>
  );
}

export default Contact;

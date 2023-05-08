import MainMenuTitle from './MainMenuTitle';
import SearchBar from './SearchBar';
import ScrollableContainer from '../ScrollableContainer';
import ContactList from './ContactList';
import {PersonAddAlt1Outlined} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {IconButton} from '@mui/material';
import {useState} from 'react';
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

  return (
    <>
      <MainMenuTitle title='Contacts' addIcon={<NewContactButton />} />
      <SearchBar placeholder='Search or make a new contact' />
      <ScrollableContainer reducedHeight='130px'>
        {contact.map((c) => (
          <ContactList
            key={c.email}
            name={c.name}
            status={c.status}
            email={c.email}
            imageUrl={c.imageUrl}
          />
        ))}
      </ScrollableContainer>
    </>
  );
}

export default Contact;

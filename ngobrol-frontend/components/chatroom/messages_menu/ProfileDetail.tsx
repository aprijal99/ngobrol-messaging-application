import {
  Avatar,
  Box,
  Button, Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton, Slide,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import {
  AlternateEmailOutlined,
  Close,
  DeleteOutlined,
  EditOutlined,
  InfoOutlined,
  InsertLinkOutlined
} from '@mui/icons-material';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import React, {useState} from 'react';
import EditProfileDetail from './EditProfileDetail';
import {UserType} from '../../../redux/slice/userSlice';
import {TransitionProps} from '@mui/material/transitions';
import {ApiType} from '../../../types/api';
import {resetActiveChat} from '../../../functions/activeChat';
import {changeActiveChat} from '../../../redux/slice/activeChatSlice';
import {deleteContact} from '../../../redux/slice/contactSlice';
import {deleteChat} from '../../../redux/slice/chatSlice';
import {stompClient} from '../../../pages/chatroom';
import {deleteContactMessage} from '../../../redux/slice/messageSlice';

const compareFn = (a: UserType, b: UserType) => {
  if(a.name < b.name) return -1;
  if(a.name > b.name) return 1;
  return 0;
}

const TransitionUp = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) { return <Slide direction='up' ref={ref} {...props} />; });

const ContactProfileDetail = () => {
  const { contact } = useSelector((state: RootState) => state.contact);
  const { activeChat: { contactEmail } } = useSelector((state: RootState) => state.activeChat);
  const contactByEmail = contact.filter(c => c.email === contactEmail)[0];

  return (
    <>
      <Avatar
        alt='Contact Profile Image' src={contactByEmail.imageUrl ? `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/image/${contactByEmail.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
        sx={{ m: '0 auto', height: '150px', width: '150px', cursor: 'pointer', }}
      />
      <Typography align='center' sx={{ mt: 3, fontSize: '1.2rem', fontWeight: 'bold', }}>
        {contactByEmail.name}
      </Typography>
      <Typography align='center' sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', mb: 3, }}>
        Last seen 2 hours ago
      </Typography>
      <Box sx={{ display: 'flex', p: 1, mx: 1.5, cursor: 'pointer', borderRadius: '10px', ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', }, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <InfoOutlined sx={{ fontSize: '2rem', color: 'rgba(255, 255, 255, 0.6)', mr: 2, }} />
        </Box>
        <Box>
          <Typography>{contactByEmail.status}</Typography>
          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Status</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', p: 1, mx: 1.5, cursor: 'pointer', borderRadius: '10px', ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', }, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <AlternateEmailOutlined sx={{ fontSize: '2rem', color: 'rgba(255, 255, 255, 0.6)', mr: 2, }} />
        </Box>
        <Box>
          <Typography>{contactByEmail.email}</Typography>
          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Email</Typography>
        </Box>
      </Box>
    </>
  );
}

const GroupProfileDetail = () => {
  const { group } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.user);
  const { activeChat: { groupId } } = useSelector((state: RootState) => state.activeChat);
  const groupById = group.filter(g => g.groupId === Number(groupId))[0];
  const orderedUsers = [...groupById.users.filter(u => u.email === user.email), ...groupById.users.filter(u => u.email !== user.email).sort(compareFn)];
  const [tab, setTab] = useState('members');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => setTab(newValue);

  return (
    <>
      <Avatar
        alt='Contact Profile Image' src={groupById.imageUrl ? `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/image/${groupById.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
        sx={{ m: '0 auto', height: '150px', width: '150px', cursor: 'pointer', }}
      />
      <Typography align='center' sx={{ mt: 3, fontSize: '1.2rem', fontWeight: 'bold', }}>
        {groupById.name}
      </Typography>
      <Typography align='center' sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', mb: 3, }}>
        {groupById.userNumber} members, 2 online
      </Typography>
      <Box sx={{ display: 'flex', p: 1, mx: 1.5, cursor: 'pointer', borderRadius: '10px', ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', }, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
          <InfoOutlined sx={{ fontSize: '2rem', color: 'rgba(255, 255, 255, 0.6)', }} />
        </Box>
        <Box>
          <Typography>{groupById.description}</Typography>
          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Description</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', p: 1, mx: 1.5, cursor: 'pointer', borderRadius: '10px', ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', }, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
          <InsertLinkOutlined sx={{ fontSize: '2rem', color: 'rgba(255, 255, 255, 0.6)', transform: 'rotate(-45deg)', }} />
        </Box>
        <Box>
          <Typography>https://n.group/{groupById.groupId}</Typography>
          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Link</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 1, mx: 1.5, mt: 1, }}>
        <Tabs value={tab} onChange={handleChange} textColor='primary' indicatorColor='primary' sx={{ '.MuiTabs-flexContainer': { justifyContent: 'space-between', }, }}>
          <Tab disableRipple value='members' label='Members' sx={{ px: 0, minWidth: '0px', fontSize: '1rem', textTransform: 'capitalize', }} />
          <Tab disableRipple value='media' label='Media' sx={{ px: 0, minWidth: '0px', fontSize: '1rem', textTransform: 'capitalize', }} />
          <Tab disableRipple value='files' label='Files' sx={{ px: 0, minWidth: '0px', fontSize: '1rem', textTransform: 'capitalize', }} />
          <Tab disableRipple value='links' label='Links' sx={{ px: 0, minWidth: '0px', fontSize: '1rem', textTransform: 'capitalize', }} />
          <Tab disableRipple value='voice' label='Voice' sx={{ px: 0, minWidth: '0px', fontSize: '1rem', textTransform: 'capitalize', }} />
        </Tabs>
      </Box>
      <Divider sx={{ mt: '-9px', mb: '9px', }} />
      {orderedUsers.map((user, idx) => <Box key={idx} sx={{ display: 'flex', p: 1, mx: 1.5, cursor: 'pointer', borderRadius: '10px', ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', }, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
          <Avatar alt='Contact Profile Image' src={user.imageUrl ? `http://localhost:7080/image/${user.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'} />
        </Box>
        <Box>
          <Typography>{user.name}</Typography>
          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Last seen 2 hours ago</Typography>
        </Box>
      </Box>)}
    </>
  );
}

const DeleteContactDialog = ({ openDialog, closeDialog, removeContact }: { openDialog: boolean, closeDialog: () => void, removeContact: () => void, }) => {
  return (
    <Dialog
      open={openDialog} onClose={closeDialog} TransitionComponent={TransitionUp}
      sx={{ '.MuiPaper-root': { m: 2.5, backgroundColor: '#252525', backgroundImage: 'none', }, }}
    >
      <DialogTitle sx={{ lineHeight: '1.5rem', }}>Delete the contact?</DialogTitle>
      <DialogActions>
        <Button onClick={() => { closeDialog(); }} sx={{ textTransform: 'none', ':hover': { backgroundColor: 'initial', }, }}>Cancel</Button>
        <Button color='error' onClick={() => { closeDialog(); removeContact() }} sx={{ textTransform: 'none', ':hover': { backgroundColor: 'initial', }, }}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

const ProfileDetail = () => {
  const store = useStore<RootState>();
  const dispatch = useDispatch<AppDispatch>();
  const { activeChat: { chatMode, contactEmail } } = useSelector((state: RootState) => state.activeChat);
  const [deleteContactDialog, setDeleteContactDialog] = useState<boolean>(false);

  const handleOnClick = () => {
    const profileDetail = document.getElementById('profile-detail');
    if(profileDetail) profileDetail.classList.remove('transform-none');

    const messageMenu = document.getElementById('message-menu');
    if(messageMenu) messageMenu.style.marginRight = '0px';
  }

  const handleClickOpenEditProfileDetail = () => {
    const editProfileDetail = document.getElementById("edit-profile-detail") as HTMLDivElement;
    if(editProfileDetail) editProfileDetail.classList.remove("translate-x-minus-100-percent");
  }

  const removeContact = () => {
    fetch(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/contact`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        userEmail: store.getState().user.user.email,
        contactEmail: contactEmail,
      }),
    })
      .then(fetchResult => fetchResult.json())
      .then((result: ApiType) => {
        if(result.code === 200) {
          const messageMenu = document.getElementById('message-menu');
          if(messageMenu) {
            messageMenu.style.marginRight = '0px';
            messageMenu.classList.remove('left-0');
          }

          stompClient.send('/app/private-message', { messageType: 'delete-contact', }, JSON.stringify({
            message: '',
            senderEmail: store.getState().user.user.email,
            receiverEmail: contactEmail,
          }));

          dispatch(changeActiveChat(resetActiveChat()));
          dispatch(deleteContact({ contactEmail: contactEmail, }));
          dispatch(deleteChat({ chatId: contactEmail, }));
          dispatch(deleteContactMessage({ contactEmail: contactEmail, }))
        }
      });
  }

  return (
    <Box
      id='profile-detail'
      sx={{
        minWidth: '100%', maxWidth: '100%', height: '100%', transform: 'translateX(100%)', overflowY: 'auto', overflowX: 'hidden',
        position: 'absolute',  right: '0', top: '0', boxShadow: 'none', backgroundColor: '#252525',
        '@media (min-width: 620px)': { minWidth: '400px', maxWidth: '400px', transform: 'translateX(400px)', },
        '@media (min-width: 1300px)': { boxShadow: 'none', }, transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        '::-webkit-scrollbar': { width: '5px', }, '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
        ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, },
      }}
    >
      <DeleteContactDialog openDialog={deleteContactDialog} closeDialog={() => setDeleteContactDialog(false)} removeContact={() => removeContact()} />

      <Box display='flex' alignItems='center' sx={{ p: '10px', pb: 3, }}>
        <IconButton onClick={handleOnClick}>
          <Close fontSize='inherit' sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
        </IconButton>
        <Typography sx={{ flexGrow: '1', fontSize: '1.2rem', fontWeight: '600', ml: 2, color: 'rgba(255, 255, 255, 0.6)', }}>Contact Detail</Typography>
        {chatMode === 'private' ?
          <IconButton onClick={() => setDeleteContactDialog(true)}>
            <DeleteOutlined fontSize='inherit' sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
          </IconButton> :
          <IconButton onClick={handleClickOpenEditProfileDetail}>
            <EditOutlined fontSize='inherit' sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
          </IconButton>
        }
      </Box>
      {chatMode === 'private' ? <ContactProfileDetail /> : <GroupProfileDetail />}
      {chatMode === 'group' && <EditProfileDetail />}
    </Box>
  );
}

export default ProfileDetail;

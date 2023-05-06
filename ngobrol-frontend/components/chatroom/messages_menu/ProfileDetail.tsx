import {Avatar, Box, Divider, IconButton, Tab, Tabs, Typography} from '@mui/material';
import {AlternateEmailOutlined, Close, InfoOutlined, InsertLinkOutlined} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import React, {useState} from 'react';

const ContactProfileDetail = () => {
  const { contact } = useSelector((state: RootState) => state.contact);
  const { activeChat: { contactEmail } } = useSelector((state: RootState) => state.activeChat);
  const contactByEmail = contact.filter(c => c.email === contactEmail)[0];

  return (
    <>
      <Avatar
        alt='Contact Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
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
  const { activeChat: { groupId } } = useSelector((state: RootState) => state.activeChat);
  const groupById = group.filter(g => g.groupId === Number(groupId))[0];

  const [tab, setTab] = useState('members');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => setTab(newValue);

  return (
    <>
      <Avatar
        alt='Contact Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
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
      {groupById.users.map((user, idx) => <Box key={idx} sx={{ display: 'flex', p: 1, mx: 1.5, cursor: 'pointer', borderRadius: '10px', ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', }, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
          <Avatar alt='Contact Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
        </Box>
        <Box>
          <Typography>{user.name}</Typography>
          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Last seen 2 hours ago</Typography>
        </Box>
      </Box>)}
    </>
  );
}

const ProfileDetail = () => {
  const { activeChat: { chatMode } } = useSelector((state: RootState) => state.activeChat);

  const handleOnClick = () => {
    const profileDetail = document.getElementById('profile-detail');
    if(profileDetail) profileDetail.classList.remove('transform-none');

    const messageMenu = document.getElementById('message-menu');
    if(messageMenu) messageMenu.style.marginRight = '0px';
  }

  return (
    <Box
      id='profile-detail'
      sx={{
        minWidth: '100%', maxWidth: '100%', height: '100%', transform: 'translateX(100%)',
        position: 'absolute',  right: '0', top: '0', boxShadow: 'none', backgroundColor: '#252525',
        '@media (min-width: 620px)': { minWidth: '400px', maxWidth: '400px', transform: 'translateX(400px)', },
        '@media (min-width: 1300px)': { boxShadow: 'none', },
        transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      <Box sx={{ textAlign: 'right', p: 2, pb: 1, }}>
        <IconButton onClick={handleOnClick}>
          <Close fontSize='inherit' sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
        </IconButton>
      </Box>
      {chatMode === 'private' ? <ContactProfileDetail /> : <GroupProfileDetail />}
    </Box>
  );
}

export default ProfileDetail;
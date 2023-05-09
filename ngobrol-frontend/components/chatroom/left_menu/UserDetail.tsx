import {Avatar, Box, IconButton, Typography} from '@mui/material';
import {AlternateEmailOutlined, ArrowBack, EditOutlined, InfoOutlined} from '@mui/icons-material';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import EditUserDetail from './EditUserDetail';

const UserDetail = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const handleClickCloseUserDetail = () => {
    const userDetail = document.getElementById('user-detail') as HTMLDivElement;
    if(userDetail) userDetail.classList.add('translate-x-minus-100-percent');
  }

  const handleClickOpenEditUserProfile = () => {
    const editUserDetail = document.getElementById('edit-user-detail') as HTMLDivElement;
    if(editUserDetail) editUserDetail.classList.remove('translate-x-100-percent');
  }

  return (
    <Box
      id='user-detail' className='translate-x-minus-100-percent'
      sx={{
        position: 'absolute', top: '0', left: '0', backgroundColor: '#252525', width: '100%', height: '100%',
        overflowX: 'hidden', overflowY: 'auto', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        '::-webkit-scrollbar': { width: '5px', }, '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
        ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, },
      }}
    >
      <Box display='flex' alignItems='center' sx={{ p: '10px', pb: 3, }}>
        <IconButton onClick={handleClickCloseUserDetail}>
          <ArrowBack fontSize='inherit' sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
        </IconButton>
        <Typography sx={{ flexGrow: '1', fontSize: '1.2rem', fontWeight: '600', ml: 2, color: 'rgba(255, 255, 255, 0.6)', }}>User Profile</Typography>
        <IconButton onClick={handleClickOpenEditUserProfile}>
          <EditOutlined fontSize='inherit' sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
        </IconButton>
      </Box>
      <Avatar
        alt='User image' src={user.imageUrl ? `http://localhost:7080/image/${user.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
        sx={{ m: '0 auto', height: '150px', width: '150px', cursor: 'pointer', }}
      />
      <Typography align='center' sx={{ my: 3, fontSize: '1.2rem', fontWeight: 'bold', }}>
        {user.name}
      </Typography>
      <Box sx={{ display: 'flex', p: 1, mx: 1.5, cursor: 'pointer', borderRadius: '10px', ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', }, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <InfoOutlined sx={{ fontSize: '2rem', color: 'rgba(255, 255, 255, 0.6)', mr: 2, }} />
        </Box>
        <Box>
          <Typography>{user.status}</Typography>
          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Status</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', p: 1, mx: 1.5, cursor: 'pointer', borderRadius: '10px', ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', }, }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <AlternateEmailOutlined sx={{ fontSize: '2rem', color: 'rgba(255, 255, 255, 0.6)', mr: 2, }} />
        </Box>
        <Box>
          <Typography>{user.email}</Typography>
          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Email</Typography>
        </Box>
      </Box>

      <EditUserDetail />
    </Box>
  );
}

export default UserDetail;

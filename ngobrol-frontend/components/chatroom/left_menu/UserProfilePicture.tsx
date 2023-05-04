import {Avatar, Box, IconButton} from '@mui/material';

const UserProfilePicture = () => {
  return (
    <Box sx={{ height: '75px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <Avatar
        alt='User Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
        sx={{ cursor: 'pointer', }}
      />
    </Box>
  );
}

export default UserProfilePicture;

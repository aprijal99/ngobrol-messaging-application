import {Avatar} from '@mui/material';

const ProfileAvatar = ({ imageUrl = 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }: { imageUrl?: string, }) => {
  return (
    <Avatar
      alt='Contact Profile Image' src={imageUrl}
      sx={{ height: '50px', width: '50px', mr: 2, }}
    />
  );
}

export default ProfileAvatar;

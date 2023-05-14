import {Box, Typography} from '@mui/material';
import {ReactNode} from 'react';

const MainMenuTitle = ({ title, addIcon }: { title: string, addIcon: ReactNode, }) => {
  return (
    <Box
      sx={{
        p: 2, height: '75px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
    >
      <Typography variant='h5' sx={{ fontWeight: 'bold', }} >{title}</Typography>
      {addIcon}
    </Box>
  );
}

export default MainMenuTitle;

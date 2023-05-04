import {ReactNode} from 'react';
import {Box} from '@mui/material';

const ScrollableContainer = ({ children, reducedHeight, display = '' }: { children: ReactNode, reducedHeight: string, display?: string, }) => {
  return (
    <Box
      id='scrollableContainer'
      sx={{
        display: display, flexDirection: display === 'flex' ? 'column-reverse' : '', position: 'relative',
        px: 2, pb: 2, overflowY: 'auto', scrollbarWidth: 'thin', height: `calc(100vh - ${reducedHeight})`,
        '::-webkit-scrollbar': { width: '5px', },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '5px', visibility: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
        ':hover': {
          '::-webkit-scrollbar-thumb': {
            visibility: 'visible',
          },
        },
      }}
    >
      {children}
    </Box>
  );
}

export default ScrollableContainer;

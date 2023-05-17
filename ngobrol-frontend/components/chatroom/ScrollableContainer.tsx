import {ReactNode} from 'react';
import {Box} from '@mui/material';

const ScrollableContainer = ({ children, reducedHeight = '0px', }: { children: ReactNode, reducedHeight?: string, }) => {
  return (
    <Box
      id='scrollableContainer'
      sx={{
        position: 'relative', px: 2, pb: 2, overflowY: 'auto', scrollbarWidth: 'thin', height: `calc(100vh - ${reducedHeight})`,
        '::-webkit-scrollbar': { width: '5px', },
        '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
        ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, },
      }}
    >
      {children}
    </Box>
  );
}

export default ScrollableContainer;

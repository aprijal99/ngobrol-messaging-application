import {ReactNode} from 'react';
import {Box, Container} from '@mui/material';

const FormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      maxWidth='sm'
      sx={{
        padding: '0 24px', position: 'absolute', left: '50%', top: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    >
      <Box
        sx={{
          py: 5, borderRadius: '4px',
          '@media (min-width: 600px)': {
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))',
          },
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default FormContainer;

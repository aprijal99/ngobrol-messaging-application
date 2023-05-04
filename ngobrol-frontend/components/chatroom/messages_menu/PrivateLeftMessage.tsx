import {Box, Typography} from '@mui/material';

const PrivateLeftMessage = ({ message, btl = false, mt = false }: { message: string, btl?: boolean, mt?: boolean, }) => {
  return (
    <Box sx={{ pr: '100px', mb: .5, mt: mt ? .5 : null }}>
      <Box
        sx={{
          px: 1.5, py: 1.2, borderRadius: '15px', display: 'inline-block', position: 'relative',
          borderTopLeftRadius: btl ? 0 : null, backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <Typography sx={{ maxWidth: '480px', lineHeight: '1.3rem', fontSize: '.95rem' }}>{message}</Typography>
      </Box>
    </Box>
  );
}

export default PrivateLeftMessage;

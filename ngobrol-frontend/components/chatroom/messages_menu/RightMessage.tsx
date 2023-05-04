import {Box, Typography} from '@mui/material';

const RightMessage = ({ message, bbr = false, mt = false }: { message: string, bbr?: boolean, mt?: boolean, }) => {
  return (
    <Box sx={{ pl: '100px', mb: .5, mt: mt ? .5 : null, display: 'flex', justifyContent: 'end', }}>
      <Box
        sx={{
          px: 1.5, py: 1.2, borderRadius: '15px', display: 'inline-block', position: 'relative',
          borderBottomRightRadius: bbr ? 0 : null, backgroundColor: '#199bf1',
        }}
      >
        <Typography sx={{ maxWidth: '480px', lineHeight: '1.3rem', fontSize: '.95rem', }}>{message}</Typography>
      </Box>
    </Box>
  );
}

export default RightMessage;

import {Alert, IconButton} from '@mui/material';
import {Close} from '@mui/icons-material';

const AlertLogin = ({ closeAlert }: { closeAlert: () => void, }) => {
  return (
    <Alert
      severity='error'
      variant='outlined'
      action={
        <IconButton
          aria-label='close'
          color='inherit'
          size='small'
          onClick={closeAlert}
        >
          <Close fontSize='inherit' />
        </IconButton>
      }
      sx={{ maxWidth: '400px', margin: '0 auto 20px', }}
    >
      Email or password is wrong
    </Alert>
  );
}

export default AlertLogin;

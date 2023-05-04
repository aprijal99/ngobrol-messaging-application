import {Button, InputAdornment, Link, TextField, Typography} from '@mui/material';
import {AccountCircle, Email, Lock} from '@mui/icons-material';
import FormContainer from '../components/login_signup/FormContainer';
import FormTitle from '../components/login_signup/FormTitle';
import FormSubtitle from '../components/login_signup/FormSubtitle';

const Signup = () => {
  return (
    <FormContainer>
      <FormTitle title='Sign Up' />
      <FormSubtitle subtitle='We are excited welcoming you to the family of Ngobrol application' />

      {/* Form */}
      <form style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto', }}>
        <TextField
          id='name' label='Name' variant='standard' fullWidth={true}
          sx={{ mb: 4, '.MuiInputBase-root': { padding: '3px 0 5px !important', }, }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id='email' label='Email' variant='standard' fullWidth={true}
          sx={{ mb: 4, '.MuiInputBase-root': { padding: '3px 0 5px !important', }, }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id='password' type='password' label='Password' variant='standard' fullWidth={true}
          sx={{ mb: 4, '.MuiInputBase-root': { padding: '3px 0 5px !important', }, }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant='contained' size='large' type='submit' fullWidth={true}
          sx={{ textTransform: 'capitalize', }}
        >
          Sign Up
        </Button>
      </form>
      {/* End of Form */}

      <Typography align='center' sx={{ mt: 2, fontSize: '.8rem', }}>
        <Link underline='none' href={'/login'}>Already have an account?</Link>
      </Typography>
    </FormContainer>
  );
}

export default Signup;

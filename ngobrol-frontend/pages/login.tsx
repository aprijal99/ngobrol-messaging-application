import {TextField, Typography, InputAdornment, Button, Link, Alert, IconButton} from '@mui/material';
import {Email, Lock} from '@mui/icons-material';
import FormContainer from '../components/login_signup/FormContainer';
import FormTitle from '../components/login_signup/FormTitle';
import FormSubtitle from '../components/login_signup/FormSubtitle';
import {GetServerSideProps, NextPage} from 'next';
import cookie, {CookieSerializeOptions} from 'cookie';
import {useState} from 'react';
import {parseBody} from 'next/dist/server/api-utils/node';
import redirectToPage from '../functions/redirectToPage';
import AlertLogin from '../components/login_signup/AlertLogin';

const Login = ({ authentication }: { authentication: boolean, }) => {
  const [alert, setAlert] = useState(authentication);

  return (
    <FormContainer>
      <FormTitle title='Login' />
      <FormSubtitle subtitle='Remember to get up & stretch once in a while - your friends at chat' />

      {alert && <AlertLogin closeAlert={() => setAlert(false)} />}

      {/* Form */}
      <form method='POST' action='/login' style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto', }}>
        <TextField
          id='email' name='username' label='Email' variant='standard' fullWidth={true}
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
          id='password' type='password' name='password' label='Password' variant='standard' fullWidth={true}
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
          Login
        </Button>
      </form>
      {/* End of Form */}

      <Typography align='center' sx={{ mt: 2, fontSize: '.8rem', }}>
        <Link underline='none' href={'/forgot-password'}>Forgot password?</Link>
      </Typography>
      <Typography align='center' sx={{ mt: 8, fontSize: '.8rem', }}>
        Don't have an account? <Link underline='none' href={'/signup'}>Sign up here</Link>
      </Typography>
    </FormContainer>
  );
}

const cookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  secure: true, // secure only work over https
  maxAge: 60 * 60,
  sameSite: 'lax',
  path: '/',
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let authentication: boolean = false;

  if(context.req.method === 'POST') {
    authentication = true;
    const form: { username: string, password: string, } = await parseBody(context.req, '1mb');
    const formBody: { [n: string]: string } = { username: form.username, password: form.password, }
    const encodedFormBody = Object.keys(formBody).map((key: string) => encodeURIComponent(key) + '=' + encodeURIComponent(formBody[key])).join('&');
    const fetchResult = await fetch(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', },
      body: encodedFormBody,
    });

    let token: { access_token: string, refresh_token: string, };
    try {
      token = await fetchResult.json();
    } catch {
      return {
        props: {
          authentication,
        },
      }
    }

    context.res.setHeader('Set-Cookie', [
      cookie.serialize('access_token', token.access_token, cookieOptions),
      cookie.serialize('refresh_token', token.refresh_token, cookieOptions),
    ]);

    return redirectToPage('chatroom')
  }

  return {
    props: {
      authentication,
    },
  }
}

export default Login;

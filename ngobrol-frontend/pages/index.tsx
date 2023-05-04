import {useState} from 'react';
import {AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppDrawer from '../components/home/AppDrawer';
import {GetServerSideProps} from 'next';
import jwtDecode from 'jwt-decode';
import {AccessTokenType} from '../types/token';
import LoginOrChatroom from '../components/home/LoginOrChatroom';

const menus: string[] = ['about', 'blog', 'support'];
const drawerWidth: number = 300;

interface Props {
  window?: () => Window,
  isValid: boolean,
}

const Index = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  return (
    <>
      {/* Navbar */}
      <Box>
        <AppBar component='nav' position='static' sx={{ backgroundImage: 'none', boxShadow: 'none', }}>
          <Toolbar
            sx={{
              minHeight: '80px', padding: '0 24px',
              '@media (min-width: 600px)': { minHeight: '80px', },
            }}
          >
            <Container
              maxWidth='lg'
              sx={{
                padding: '0', display: 'flex', justifyContent: 'space-between',
                '@media (min-width: 600px)': { padding: '0', },
              }}
            >
              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', }} >
                <img src='/logo.png' alt='logo' style={{ width: '30px', marginRight: '10px', }} />
                <Typography variant='h6' component='div' sx={{ fontWeight: 'bold', }} >Ngobrol</Typography>
              </Box>
              {/* Top Menu */}
              <Box sx={{ display: { xs: 'none', sm: 'block', }, }} >
                {menus.map((item) => (
                  <Button
                    key={item} href={`/${item}`}
                    sx={{ color: 'white', fontSize: '1rem', textTransform: 'capitalize', }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
              {/* Login and Toggle Button */}
              <Box>
                {props.isValid ? <LoginOrChatroom text='Chatroom' /> : <LoginOrChatroom text='Login' />}
                <IconButton
                  color='inherit' aria-label='open drawer' edge='start'
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1, mr: -1, display: { sm: 'none', }, }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
        {/* Side Mobile Menu */}
        <Box component='nav'>
          <Drawer
            variant='temporary'
            container={container}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true, }}
            sx={{
              display: { xs: 'block', sm: 'none', },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, },
            }}
          >
            <AppDrawer menus={menus} handleDrawerToggle={handleDrawerToggle} />
          </Drawer>
        </Box>
      </Box>
      {/* End of Navbar */}

      {/* Banner */}
      <Container
        maxWidth='md'
        sx={{ marginTop: '3rem', padding: '0 24px', '@media (min-width: 600px)': { marginTop: '5rem', }, }}
      >
        <Typography
          variant='h2' align='center' gutterBottom={true}
          sx={{
            fontWeight: 'bold', marginBottom: '2rem',
            '@media (max-width: 600px)': { fontSize: '10vw', textAlign: 'left', },
          }}
        >
          The platform for people who want to stay connected
        </Typography>
        <Typography
          align='left'
          sx={{
            maxWidth: '650px', margin: '0 auto', lineHeight: '1.8rem',
            '@media (min-width: 600px)': { textAlign: 'center', },
          }}
        >
          Imagine a place where you can belong to a school club, a gaming group,
          or a worldwide art community. Where just you and a handful of friends can
          spend time together. A place that makes it easy to talk every day
          and hang out more often
        </Typography>
        <Box sx={{ marginTop: '2rem', '@media (min-width: 600px)': { textAlign: 'center', }, }}>
          <Button
            variant='contained' size='large' href='/signup'
            sx={{ marginRight: '.5rem', textTransform: 'capitalize', }}
          >
            Try For Free
          </Button>
          <Button
            variant='outlined' size='large' href='/about'
            sx={{ marginLeft: '.5rem', textTransform: 'capitalize', }}
          >
            Learn More
          </Button>
        </Box>
      </Container>
      {/* End of Banner */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let isValid: boolean = false
  const accessToken: string | undefined = context.req.cookies['access_token'] as string;

  if(accessToken !== undefined) {
    const decodedAccessToken: AccessTokenType = jwtDecode(accessToken);
    isValid = Date.now() / 1000 < decodedAccessToken.exp;
  }

  return {
    props: {
      isValid,
    },
  }
}

export default Index;

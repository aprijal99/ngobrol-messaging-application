import {Box, Divider, Link, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';

const AppDrawer = ({ menus, handleDrawerToggle }: { menus: string[], handleDrawerToggle: () => void }) => {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', }} >
      <Box sx={{ my: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
        <img src='/logo.png' alt='logo' style={{ width: '30px', marginRight: '10px', }}/>
        <Typography variant='h6' sx={{ fontWeight: 'bold', }} >Ngobrol</Typography>
      </Box>
      <Divider />
      <List>
        {menus.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', }} >
              <ListItemText
                primary={<Link href={`/${item}`} underline='none' color='white' >{item}</Link>}
                sx={{ textTransform: 'capitalize', }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AppDrawer;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { withStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { handleSignOut } from '../redux/actions/auth';
import { handleToggleTheme } from '../redux/actions/theme';

import { connect } from "react-redux"

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
    height: `calc(100% - ${theme.spacing(8)})`
  }
})

const drawerWidth = 240;

const MenuDrawer = props => {
  const { window, classes, children, theme, onHandleSignOut, onHandleToggleTheme, isAdmin, isRoot, user } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button onClick={() => navigate('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        {isAdmin && <>
          <Divider />
          <ListItem button onClick={() => navigate('/tests')}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Tests" />
          </ListItem>
          <ListItem button onClick={() => navigate('/groups')}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItem>
        </>}
        {isRoot && <>
          <ListItem button onClick={() => navigate('/users')}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </>}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" onClick={() => navigate('/')} width={drawerWidth}>
            weexam
          </Typography>
          <Typography variant="body2" color="text.light" noWrap component="div" onClick={() => navigate('/')} sx={{ ml: -2 }}>
            Logged as {user}
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <IconButton
              color="inherit"
              onClick={() => onHandleSignOut()}
            >
              <LogoutIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => onHandleToggleTheme()}
            >
              {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate('/profile')}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          PaperProps={{
            elevation: 1
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        className={classes.root}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    isAdmin: ['root', 'admin'].includes(state?.auth?.data?.role),
    isRoot: state?.auth?.data?.role === 'root',
    user: `${state?.auth?.data?.firstName} ${state?.auth?.data?.lastName}` 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHandleSignOut: () => dispatch(handleSignOut()),
    onHandleToggleTheme: () => dispatch(handleToggleTheme())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuDrawer));
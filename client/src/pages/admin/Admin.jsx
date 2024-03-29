import './admin.css'
import { Outlet, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  styled,
  AppBar as MuiAppBar,
  IconButton,
  Drawer,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from '../../constants/mui-components.jsx'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline } from '@mui/material'

import { AuthContext } from '../../contexts/AuthContext.js';
import ScrollTop from '../../components/scrollTop/ScrollTop'
import Navbar from '../../components/navbar/Navbar'
import { MANAGEMENT_ITEMS } from '../../constants/Constant'
import Footer from '../../components/footer/Footer'

// ----------------------------------------------------------------
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// ----------------------------------------------------------------
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

// ----------------------------------------------------------------
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// ----------------------------------------------------------------
const Admin = () => {
  const [open, setOpen] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState();

  const { user } = useContext(AuthContext)
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleShowScrollToTop = () => {
      setShowGoToTop(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleShowScrollToTop);

    return () => {
      window.removeEventListener('scroll', handleShowScrollToTop);
    }
  }, [])

  useEffect(() => {
    if (user?.isAdmin !== true) {
      navigate('/forbidden')
    }

  }, [navigate, user])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid className='admin'>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2, ...(open && { display: 'none' }),
              position: 'fixed',
              top: '0.75em',
              left: '3em',
              zIndex: '1010',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Navbar role='admin' />
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {MANAGEMENT_ITEMS.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => navigate(item.url)}
              >
                <ListItemButton>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open} sx={{ background: '#f2dcd0' }}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
      <Footer />
      {showGoToTop && (
        <ScrollTop />
      )}
    </Grid>
  )
}

export default Admin
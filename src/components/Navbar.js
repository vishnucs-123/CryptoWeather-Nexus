import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const handleNavigate = (path) => {
    setOpen(false);
    if (router.pathname === path) {
      router.replace(path);
    } else {
      router.push(path);
    }
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Weather', path: '/weather' },
    { label: 'Crypto', path: '/crypto' },
    { label: 'News', path: '/news' },
  ];

  const trigger = useScrollTrigger();

  return (
    <>
      {/* Sticky Navbar with Hide on Scroll */}
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar position="sticky" color="primary" sx={{ backgroundColor: '#0f172a' }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => handleNavigate('/dashboard')}
            >
              CryptoWeather Nexus
            </Typography>

            {/* Desktop Menu */}
            {!isMobile ? (
              <Box>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    onClick={() => handleNavigate(item.path)}
                    sx={{ mx: 1 }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            ) : (
              // Mobile Drawer Button
              <>
                <IconButton color="inherit" onClick={() => setOpen(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                  <List sx={{ width: 200 }}>
                    {menuItems.map((item) => (
                      <ListItem key={item.path} disablePadding>
                        <ListItemButton onClick={() => handleNavigate(item.path)}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  );
};

export default Navbar;

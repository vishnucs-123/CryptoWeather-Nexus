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
      {/* Sticky Navbar with Hide on Scroll Animation */}
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h5"
              onClick={() => handleNavigate('/')}
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                color: 'white',
                letterSpacing: 1,
                '&:hover': { color: '#60A5FA' },
              }}
            >
              CRYPTO<span style={{ color: '#60A5FA' }}>-WEATHER-</span>NEXUS
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  onClick={() => setOpen(true)}
                  sx={{ color: 'white' }}
                >
                  <MenuIcon />
                </IconButton>

                {/* Animated Drawer */}
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={() => setOpen(false)}
                  transitionDuration={{ enter: 400, exit: 400 }}
                >
                  <Box sx={{ width: 250, p: 2 }}>
                    <List>
                      {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton onClick={() => handleNavigate(item.path)}>
                            <ListItemText primary={item.label} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        display: 'block',
                        width: '0%',
                        height: '2px',
                        background: '#60A5FA',
                        transition: 'width 0.3s',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  );
};

export default Navbar;

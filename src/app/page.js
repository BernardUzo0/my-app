'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* APP BAR */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              McDonald's App
            </Typography>

            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>

            <Link href="/register">
              <Button color="inherit">Register</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      {/* MAIN CONTENT */}
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          
          {/* ⭐ McDonald's Logo (Centered) */}
          <img 
            src="/logo.png" 
            alt="McDonald's Logo" 
            style={{ width: '420px', marginBottom: '20px' }}
          />

          <Typography variant="h4" sx={{ mb: 2 }}>
            Welcome to McDonald's Ordering
          </Typography>

          <Typography sx={{ mb: 4 }}>
            Please login or register to start ordering.
          </Typography>

          {/* BUTTONS */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Link href="/login">
              <Button variant="contained" fullWidth sx={{ py: 1.5 }}>
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button variant="outlined" fullWidth sx={{ py: 1.5 }}>
                Register
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}

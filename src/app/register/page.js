'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function RegisterPage() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handling register submit");

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const pass  = data.get('pass');   // name=pass

    console.log("Sent email:", email);
    console.log("Sent pass:", pass);

    runDBCallAsync(`/api/register?email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`);
  };

  async function runDBCallAsync(url) {
    try {
      const res  = await fetch(url);
      const data = await res.json();
      console.log("Register API response:", data);

      if (data.success) {
        window.location.href = '/login';
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error calling register API:', err);
      alert('Server error');
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              McDonald's – Register
            </Typography>
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="pass"
              label="Password"
              name="pass"
              type="password"
              autoComplete="new-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

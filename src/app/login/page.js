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

export default function LoginPage() {

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const pass  = data.get('pass');   // keep name "pass"

    runLogin(`/api/login?email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`);
  };

  async function runLogin(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.success) {
      alert("Invalid login");
      return;
    }

    // Save user locally
    localStorage.setItem("email", data.username);
    localStorage.setItem("role", data.account_type);

    // Redirect based on role
    if (data.account_type === "customer") {
      window.location.href = "/dashboard";
    } else if (data.account_type === "manager") {
      window.location.href = "/manager";
    }
  }

  return (
    <>
      {/* AppBar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              McDonald's – Login
            </Typography>
            <Link href="/register">
              <Button color="inherit">Register</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Login Form */}
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              margin="normal"
            />

            <TextField
              fullWidth
              required
              label="Password"
              name="pass"
              margin="normal"
              type="password"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

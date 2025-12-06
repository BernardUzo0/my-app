'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function ViewCartPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  async function loadCart() {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('Not logged in');
      return;
    }

    const res  = await fetch(`/api/view_cart?email=${encodeURIComponent(email)}`);
    const data = await res.json();

    if (data.success) {
      setItems(data.items);
      setTotal(data.total);
    } else {
      alert(data.message || 'Could not load cart');
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function removeItem(id) {
    const res  = await fetch(`/api/removeFromCart?id=${id}`);
    const data = await res.json();
    if (data.success) {
      loadCart();
    } else {
      alert(data.message || 'Could not remove item');
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
              Shopping Cart
            </Typography>
            <Link href="/dashboard">
              <Button color="inherit">Menu</Button>
            </Link>
            <Link href="/checkout">
              <Button color="inherit">Checkout</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.pname}</TableCell>
                  <TableCell>€{item.price?.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      color="error"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>Cart is empty.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: €{total.toFixed(2)}
          </Typography>

          {/* Big checkout button under the total */}
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button
              variant="contained"
              color="error"
              sx={{ px: 4, py: 1.2, fontSize: '1rem' }}
              onClick={() => (window.location.href = '/checkout')}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

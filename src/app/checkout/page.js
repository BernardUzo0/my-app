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

export default function CheckoutPage() {
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

  async function confirmOrder() {
    const email = localStorage.getItem('email');
    if (!email) {
      alert('Not logged in');
      return;
    }

    const res  = await fetch(`/api/checkout?email=${encodeURIComponent(email)}`);
    const data = await res.json();

    if (data.success) {
      alert('Order placed! Thank you.');
      window.location.href = '/dashboard';
    } else {
      alert(data.message || 'Could not place order');
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
              Checkout
            </Typography>
            <Link href="/view_cart">
              <Button color="inherit">Back to Cart</Button>
            </Link>
            <Link href="/dashboard">
              <Button color="inherit">Menu</Button>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.pname}</TableCell>
                  <TableCell>€{item.price?.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2}>Cart is empty.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: €{total.toFixed(2)}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={confirmOrder}
              disabled={items.length === 0}
            >
              Confirm Order
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

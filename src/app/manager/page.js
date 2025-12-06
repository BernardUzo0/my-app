'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function ManagerPage() {
  const [totalOrders, setTotalOrders]   = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orders, setOrders]             = useState([]);

  async function loadStats() {
    const res  = await fetch('/api/manager');
    const data = await res.json();

    if (data.success) {
      setTotalOrders(data.totalOrders);
      setTotalRevenue(data.totalRevenue);
      setOrders(data.orders);
    } else {
      alert(data.message || 'Could not load stats');
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Manager Dashboard
            </Typography>
            <Link href="/manager/graph">
              <Button color="inherit">Graph Data</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">Total Orders</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {totalOrders}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">Total Revenue</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    €{totalRevenue.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Orders
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Email</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Items</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o._id}>
                  <TableCell>{o.email}</TableCell>
                  <TableCell>
                    {o.time
                      ? new Date(o.time).toLocaleString()
                      : (o.createdAt ? new Date(o.createdAt).toLocaleString() : '')}
                  </TableCell>
                  <TableCell>€{o.total?.toFixed(2)}</TableCell>
                  <TableCell>
                    {(o.items || []).map((i, idx) => (
                      <span key={idx}>
                        {i.pname} (€{i.price?.toFixed(2)})
                        {idx < o.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              ))}

              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>No orders yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </>
  );
}

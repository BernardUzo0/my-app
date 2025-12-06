'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  // weather state
  const [weather, setWeather] = useState(null);       
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const res  = await fetch('/api/dashboard');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error('Failed to load products:', data.message);
        }
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    }

    async function loadWeather() {
      try {
        // Dublin weather API
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=53.35&longitude=-6.26&current_weather=true'
        );
        const data = await res.json();
        if (data.current_weather) {
          setWeather({
            temp: data.current_weather.temperature,   
            wind: data.current_weather.windspeed,     
          });
        } else {
          setWeatherError('No weather data available');
        }
      } catch (err) {
        console.error('Weather API error:', err);
        setWeatherError('Weather service unavailable');
      }
    }

    loadProducts();
    loadWeather();
  }, []);

  async function putInCart(pname, price) {
    const email = localStorage.getItem('email');

    if (!email) {
      alert('You must be logged in to add to cart');
      return;
    }

    try {
      const res  = await fetch(
        `/api/putInCart?pname=${encodeURIComponent(pname)}&price=${price}&email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      if (data.success) {
        alert('Added to cart');
      } else {
        alert(data.message || 'Could not add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Server error');
    }
  }

  if (loading) {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              McDonald's – Menu
            </Typography>
            <Link href="/view_cart">
              <Button color="inherit">View Cart</Button>
            </Link>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md">
          <Box sx={{ mt: 4 }}>Loading products...</Box>
        </Container>
      </>
    );
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
              McDonald's – Menu
            </Typography>
            <Link href="/view_cart">
              <Button color="inherit">View Cart</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          {/* Weather panel */}
          <Box sx={{ mb: 3 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h6">Current Weather – Dublin</Typography>
                {weather ? (
                  <>
                    <Typography variant="body1">
                      Temperature: <b>{weather.temp}°C</b>
                    </Typography>
                    <Typography variant="body2">
                      Wind: {weather.wind} km/h
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2">
                    {weatherError || 'Loading weather...'}
                  </Typography>
                )}
              </Box>
            </Paper>
          </Box>

          <Typography variant="h4" sx={{ mb: 3 }}>
            Our Menu
          </Typography>

          <Grid container spacing={3}>
            {products.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {item.imageUrl && (
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.imageUrl}
                      alt={item.pname}
                    />
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.pname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.description}
                    </Typography>
                    <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
                      €{item.price?.toFixed ? item.price.toFixed(2) : item.price}
                    </Typography>
                  </CardContent>

                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => putInCart(item.pname, item.price)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

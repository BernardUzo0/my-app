'use client';

import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ManagerGraphPage() {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    async function loadGraphData() {
      const res  = await fetch('/api/manager/graph');
      const data = await res.json();
      if (data.success) {
        setLabels(data.labels);
        setValues(data.values);
      } else {
        alert(data.message || 'Could not load graph data');
      }
    }
    loadGraphData();
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
              Sales Graph
            </Typography>
            <Link href="/manager">
              <Button color="inherit">Back to Dashboard</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Total Sales per Day (€)
              </Typography>

              {labels.length > 0 ? (
                <BarChart
                  xAxis={[{ scaleType: 'band', data: labels }]}
                  series={[
                    {
                      data: values,
                      label: 'Sales (€)',
                    },
                  ]}
                  width={700}
                  height={400}
                />
              ) : (
                <Typography>No data yet. Place some orders first.</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

import React from 'react';
import { Card, CardContent, Typography, Container, Box, Button } from '@mui/material';
import Bg from '../../assets/images/bg.png'; // Adjust the path to your background image
import { Link } from 'react-router-dom';

export default function Thankyou() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 16px', marginBottom: '16px' }}>
      <Link to="/">  <Button sx={{ backgroundColor: "white", color: "#008b8b" }}><b>Back to Home</b></Button> </Link>
       <Link to="/status"> <Button sx={{ backgroundColor: "white", color: "#008b8b" }}><b>Continue to Order</b></Button> </Link>
      </Box>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Thank You!
            </Typography>
            <Typography variant="body1" align="center">
              Your order has been placed successfully. We appreciate your business!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

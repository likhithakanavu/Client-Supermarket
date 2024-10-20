import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const API_HOST = "http://localhost:5000";
const API_ENDPOINT = "/api/admin/login";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [adminToken, setAdminToken] = useState(null);
    const [adminInfo, setAdminInfo] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storeToken = localStorage.getItem('AdminToken');
        if (storeToken) {
            try {
                setAdminToken(JSON.parse(storeToken));
            } catch (error) {
                console.error("Invalid JSON in localStorage for 'AdminToken'");
            }
        }
    }, []);

    const handleChange = (e) => {
        setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = adminInfo;
        try {
            const response = await axios.post(`${API_HOST}${API_ENDPOINT}`, { email, password });
            alert(response.data.message);
            if (response.data.success) {
                localStorage.setItem('AdminToken', JSON.stringify(response.data.adminToken));
                window.location.href = '/Admin/Dashboard'; // Redirect to admin dashboard
                setAdminToken(response.data.adminToken);
                navigate('/Admin');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Card sx={{ my: 5, bgcolor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(30px)' }}>
                        <CardContent sx={{ p: 5, boxShadow: 5, textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" mb={5}>Admin Login</Typography>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    margin="normal"
                                    value={adminInfo.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    value={adminInfo.password}
                                    onChange={handleChange}
                                />
                                <Button fullWidth variant="contained" color="primary" size="large" type="submit" sx={{ mb: 4 }}>Sign In</Button>
                            </form>
                            {message && (
                                <Typography color="error" variant="body2" align="center">
                                    {message}
                                </Typography>
                            )}
                            <Typography variant="body1" mb={2}>or sign in with:</Typography>
                            <Box display="flex" justifyContent="center">
                                <IconButton color="primary" component="a">
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton color="primary" component="a">
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton color="primary" component="a">
                                    <GoogleIcon />
                                </IconButton>
                                <IconButton color="primary" component="a">
                                    <GitHubIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="login" className="w-100 rounded-4 shadow-4" style={{ width: '100%', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminLogin;

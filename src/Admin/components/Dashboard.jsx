import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FeedbackIcon from '@mui/icons-material/Feedback';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    newRecipesToday: 0,
    totalSuggestions: 0,
  });

  const navigate = useNavigate();
  const host = "http://127.0.0.1:7001";
  const [count,setCount] = useState('');

  useEffect(() => {
    if (localStorage.getItem("AdminToken") == null) {
      navigate("/admin/adlogin");
    }
  }, []);

 console.log(count,"CCCC")

  useEffect(() => {
    axios.get(`${host}/overall/count`)
        .then((res) => {
            console.log(res.data)
            setCount(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <PersonIcon sx={{ fontSize: 40 }} />
              <Typography gutterBottom variant="h5" component="div">
                Total Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {count.User}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <StoreIcon sx={{ fontSize: 40 }} />
              <Typography gutterBottom variant="h5" component="div">
                Total SuperMarket
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {count.superM}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <FastfoodIcon sx={{ fontSize: 40 }} />
              <Typography gutterBottom variant="h5" component="div">
                Total Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {count.Product}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <FeedbackIcon sx={{ fontSize: 40 }} />
              <Typography gutterBottom variant="h5" component="div">
                Total Feedback
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {count.Feed}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

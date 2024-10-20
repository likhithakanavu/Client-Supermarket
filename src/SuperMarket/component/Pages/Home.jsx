import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardActions, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person, ShoppingCart } from '@mui/icons-material';
import axios from 'axios';

const CardContentWithIcon = ({ icon, heading, subheading }) => (
  <>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h5" component="div" sx={{ ml: 2 }}>
        {heading !== undefined ? heading : 0}
      </Typography>
    </Box>
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {subheading}
    </Typography>
  </>
);

export default function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState({ User: 0, Product: 0 });
  const [order, setOrder] = useState([]);

  const host = "http://127.0.0.1:7001";

  useEffect(() => {
    if (!localStorage.getItem("SupermToken")) {
      navigate("/smlogin");
    }
  }, [navigate]);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('SupermToken'));

    axios.get(`${host}/overall/counts`, { headers: { "auth-token": token } })
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(`${host}/order/todaysuperget`, { headers: { "auth-token": token } })
      .then((res) => {
        setOrder(res.data);
        let data = res.data.flatMap(item => item.p_id);
        let superdata = data.filter(item => item.s_id === "66b44332a0c1c3007920e1bf");
        console.log(superdata, "Filtered Products");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Typography paragraph>
        Dashboard
      </Typography>
      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid item xs={6}>
          <Card sx={{ width: 250, backgroundColor: "#b0c4de" }}>
            <CardContent>
              <CardContentWithIcon
                icon={<Person />}
                heading={count.User}
                subheading="Total number of users"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ width: 250, backgroundColor: "#b0c4de" }}>
            <CardContent>
              <CardContentWithIcon
                icon={<ShoppingCart />}
                heading={count.Product}
                subheading="Total number of Products"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">SI/NO</TableCell>
              <TableCell align="left">User Details</TableCell>
              <TableCell align="left">Product Details</TableCell>
              <TableCell align="left">Grand Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">
                  <b>Name: </b>{row.name}<br />
                  <b>Email: </b>{row.email} <br />
                  <b>Phone: </b>{row.phone}<br />
                  <b>Address: </b>{row.address}, {row.city}, {row.country}, {row.zip}.
                </TableCell>
                <TableCell align="left">
                  {row.p_id?.map((dish, dishIndex) => (
                    <div key={dish._id}>
                      <b>Product Name: </b>{dish.p_id?.name}<br />
                      <b>Product Price: </b>{dish.p_id?.price}<br />
                      <b>Quantity: </b>{dish.qty}<br />
                      <b>Status: </b>{dish.orstatus}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="left"><b>{row.grandtotal}</b></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

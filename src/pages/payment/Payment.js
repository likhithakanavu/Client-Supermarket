import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBListGroup, MDBListGroupItem, MDBTypography } from 'mdb-react-ui-kit';
import QRCode from 'react-qr-code'; // Import QRCode from react-qr-code
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Payment = () => {
  let navigate = useNavigate();
  const host = 'http://127.0.0.1:7001';
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState({});
  const [Details, setDetails] = useState({
    address: "",
    city: "",
    country: "India",
    zip: "",
    transactionid: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("UserToken") == null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('UserToken'));
    axios
      .get(`${host}/user/vieww`, { headers: { 'auth-token': token } })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [host]);

  console.log(user,"User")

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('UserToken'));
    axios
      .get(`${host}/cart/get`, { headers: { "auth-token": token } })
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [host]);

  // Calculate the grand total
  const grandTotal = cart.reduce((sum, item) => sum + item.qty * item.p_id.price, 0);

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.address = Details.address ? "" : "Address is required.";
    tempErrors.city = Details.city ? "" : "City is required.";
    tempErrors.zip = Details.zip ? "" : "Zip/Postal code is required.";
    tempErrors.transactionid = Details.transactionid.length === 12 ? "" : "Transaction ID must be exactly 12 digits.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const HandleSubmit = () => {
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }
    let data = { ...Details, ...user, grandTotal };
    let token = JSON.parse(localStorage.getItem('UserToken'));

    axios
      .post(`${host}/order/Insert`, data, { headers: { "auth-token": token } })
      .then((res) => {
        if (res.data) {
          setOpen(true);
          navigate('/thankyou');
        } else {
          console.log("Some error occurred");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card style={{backgroundColor:"#fdf5e6"}}>
              <CardContent>
                <Typography variant="h5" style={{color:"red"}} gutterBottom><b>Checkout</b></Typography><br/>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={user?.name || ''}
                      InputLabelProps={{ shrink: true }}
                      name="name"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={user?.email || ''}
                      InputLabelProps={{ shrink: true }}
                      name="email"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={user?.phone || ''}
                      InputLabelProps={{ shrink: true }}
                      name="phone"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                     
                      onChange={HandleChange}
                      name="address"
                      variant="outlined"
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Town/City"
                    
                      onChange={HandleChange}
                      name="city"
                      variant="outlined"
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      value="India"
                      name="country"
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Zip/Postal"
                     
                      onChange={HandleChange}
                      name="zip"
                      variant="outlined"
                      error={!!errors.zip}
                      helperText={errors.zip}
                    />
                  </Grid>
                </Grid>
                <Typography variant="h5" gutterBottom sx={{ mt: 4,color:"red" }}><b>Payment method</b></Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      component="div"
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <QRCode
                        value="http://localhost:3000/paymentgateway" // Replace with your actual URL or data
                        size={200}
                        fgColor="#000000"
                        bgColor="#ffffff"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Transaction ID"
                     
                      onChange={HandleChange}
                      name="transactionid"
                      variant="outlined"
                      error={!!errors.transactionid}
                      helperText={errors.transactionid}
                    />
                  </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                  <Button variant="contained" onClick={HandleSubmit} color="primary">Complete Checkout and Pay</Button>
              <Link to="/">   <Button variant="contained"  color="primary">Back to Home</Button></Link> 

                </Box>
              </CardContent>
            </Card>
          </Grid>
          <MDBCol md="4" style={{ marginTop: '30px', backgroundColor:"#fdf5e6" }}>
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0" style={{color:"red"}}>
                  <b>Summary</b>
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  {cart?.map((row, index) => (
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0" key={index}>
                      {row?.p_id?.name}
                      <span>{` ₹${row?.qty * row?.p_id?.price}`}</span>
                    </MDBListGroupItem>
                  ))}
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>₹ {grandTotal}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </Grid>
      </Container>
    </div>
  );
};

export default Payment;

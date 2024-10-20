import React, { useEffect, useState } from "react";
import { Box, Paper, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Update() {
  const host = "http://127.0.0.1:7001";
  const [Superm, setSuperm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let tokenuser = JSON.parse(localStorage.getItem('loggedSuperm'));
    if (tokenuser) {
      const id = tokenuser._id;
      console.log(id, "fffffffffffff");

      axios.get(`${host}/SuperM/singleview/${id}`)
        .then((res) => {
          setSuperm(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [host]);

  const handleDetails = (e) => {
    setSuperm({ ...Superm, [e.target.name]: e.target.value });
  };

  const Handlesubmit = () => {
    let tokenuser = JSON.parse(localStorage.getItem('loggedSuperm'));
    if (tokenuser && Superm) {
      const id = tokenuser._id;
      axios.put(`${host}/SuperM/profileupdate/${id}`, Superm, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.data.success) {
            console.log('Profile updated successfully!');
            navigate('/smprofile');
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };

  if (!Superm) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or a better UI element
  }

  return (
    <div style={{ height: "100%" }}>
      <Paper>
        <Box
          sx={{
            backgroundColor: "#f0f1f6",
            padding: "2px 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "rgb(82, 95, 127)",
              fontWeight: "400",
              fontSize: "15px",
            }}
          >
            Profile Updated
          </p>
        </Box>
        <br /><br />
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Name"
              name="name"
              value={Superm.name || ''}
              variant="outlined"
              size="small"
              onChange={handleDetails}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              value={Superm.email || ''}
              variant="outlined"
              size="small"
              onChange={handleDetails}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Phone"
              name="phone"
              value={Superm.phone || ''}
              variant="outlined"
              size="small"
              onChange={handleDetails}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Address"
              name="address"
              value={Superm.address || ''}
              variant="outlined"
              size="small"
              onChange={handleDetails}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={Handlesubmit}>
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

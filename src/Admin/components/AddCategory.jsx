import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export default function AddCategory() {
  const API_HOST = "http://localhost:7001";
  const API_ENDPOINT = "/category/insert";

  const [data, setData] = useState({
    name: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = data.name ? '' : 'Category name is required.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
  
    try {
      setLoading(true); // Set loading state to true
      const response = await axios.post(`${API_HOST}${API_ENDPOINT}`, data);
      console.log(response.data); // Log response if needed
      toast.success("Category added successfully!"); // Show success notification
      setData({ name: '' }); // Clear form fields after successful submission
    } catch (err) {
      console.error("There was an error submitting the form!", err);
      toast.error("Error submitting the form. Please try again."); // Show error notification
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Grid container justifyContent="center">
        <Grid item lg={12}>
          <Paper elevation={10} sx={{ p: 3 }}>
            <Typography sx={{ color: 'red', mb: 4, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} variant="h3" component="h1" align='center'>
              Add Category
            </Typography>
            <Grid container spacing={1}>
              <Grid item xl={12} md={12}>
                <TextField
                  id="categoryname"
                  onChange={handleChange}
                  value={data.name}
                  label="Enter Your Category Name"
                  name="name"
                  variant="outlined"
                  size="large"
                  fullWidth
                  {...(errors.name && { error: true, helperText: errors.name })}
                />
              </Grid>
            </Grid><br/>
            <Button
              variant="outlined"
              onClick={handleSubmit}
              // fullWidth
              justifyContent="center"
              sx={{ mt: 1, marginLeft:"450px" }}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Submitting...' : 'Submit'} {/* Show loading text */}
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer /> {/* Add ToastContainer to your component */}
    </Box>
  );
}

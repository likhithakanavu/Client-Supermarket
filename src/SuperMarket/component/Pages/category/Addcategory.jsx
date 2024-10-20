import React, { useState, useEffect, useCallback } from 'react';
import { Box, Paper, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AddCategory() {
    const host = "http://127.0.0.1:7000";
    const [catDetails, setCatDetails] = useState({});
    const [fields, setFields] = useState([{ roadmap: '' }]);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const handleClose = useCallback((event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }, []);

    const handleCatDetails = useCallback((e) => {
        setCatDetails({ ...catDetails, [e.target.name]: e.target.value });
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: ""
        }));
    }, [catDetails]);

    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        if (!catDetails.name) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }, [catDetails]);




    const handleSubmit = useCallback(() => {
        if (!validateForm()) {
            return;
        }

        axios.post(`${host}/category/insert`, catDetails)
            .then((res) => {
                if (res.data) {
                    setOpen(true);
                } else {
                    console.log("Some error occurred");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [catDetails, validateForm]);

    return (
        <div style={{ height: '100%' }}>
            <Paper>
                <Box sx={{ backgroundColor: '#f0f1f6', padding: '2px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: 'rgb(82, 95, 127)', fontWeight: '400', fontSize: '15px' }}>Insert Category Details</p>
                    <Link to='/admin/managecat'><Button size='small' endIcon={<ArrowForwardIosIcon />}>View cat</Button></Link>
                </Box>

                <Grid container sx={{ p: 2, marginLeft: "-100px" }} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField
                            id="outlined-basic"
                            label="Category Title"
                            name='name'
                            onChange={handleCatDetails}
                            variant="outlined"
                            size="medium"
                            sx={{ width: '500px' }}
                            fullWidth
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex' }} justifyContent="center" alignItems="center">
                    <Box sx={{ p: 3, width: '400px' }}>
                        <Button variant='contained' color='primary' fullWidth onClick={handleSubmit}>Submit</Button>
                    </Box>
                </Box>
            </Paper>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    cat Inserted!
                </Alert>
            </Snackbar>
        </div>
    );
}

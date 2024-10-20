import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, TextField, Snackbar, Alert, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function ViewCategory() {
    const host = "http://localhost:7001";

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [state, setState] = useState(false);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = selectedCategory?.name ? '' : 'Category name is required.';
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
    };

    useEffect(() => {
        axios.get(`${host}/category/view`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error('Error fetching categories:', err);
                setSnackbarMessage('Error fetching categories');
                setSnackbarOpen(true);
            });
    }, [state]);

    const handleOpen = (category) => {
        setSelectedCategory(category);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCategory(null);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        setState(false);

        if (!validate()) return;

      

        axios.put(`${host}/category/update/${selectedCategory._id}`,selectedCategory)
            .then((res) => {
                setData((prevData) => prevData.map(cat => cat._id === selectedCategory._id ? res.data : cat));
                handleClose();
                setSnackbarMessage('Category updated successfully');
                setSnackbarOpen(true);
                setState(true);
            })
            .catch((err) => {
                console.error('Error updating category:', err);
                setSnackbarMessage('Error updating category');
                setSnackbarOpen(true);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            axios.delete(`${host}/category/delete/${id}`)
                .then((res) => {
                    setData((prevData) => prevData.filter(cat => cat._id !== id));
                    setSnackbarMessage('Category deleted successfully');
                    setSnackbarOpen(true);
                })
                .catch((err) => {
                    console.error('Error deleting category:', err);
                    setSnackbarMessage('Error deleting category');
                    setSnackbarOpen(true);
                });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <TableContainer component={Paper}>
                <Table style={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ background: 'linear-gradient(to right, white, grey)' }}>
                        <TableRow>
                            <TableCell><b>SI/NO</b></TableCell>
                            <TableCell><b>Category Name</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, i) => (
                            <TableRow key={item._id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(item)}><EditIcon /></Button>
                                    <Button onClick={() => handleDelete(item._id)}><DeleteOutlineIcon /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...modalStyle, backgroundColor: 'white', width: 400 }}>
                    <Typography variant="h6" id="modal-modal-title" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                        Update Category
                    </Typography>
                    <TextField
                        label="Category Name"
                        name="name"
                        value={selectedCategory?.name || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <Button onClick={handleUpdate} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                        Update
                    </Button>
                </Box>
            </Modal>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '20px',
};

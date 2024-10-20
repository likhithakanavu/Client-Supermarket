import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PreviewIcon from '@mui/icons-material/Preview';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2'
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ClearIcon from '@mui/icons-material/Clear';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useParams, useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    borderRadius: '10px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    maxHeight: '500px',
    overflowY: 'auto',
    //   border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Managepaymet() {

    const host = "http://127.0.0.1:7000";
    let navigate = useNavigate()

    const [Cat, setCat] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState('');
    const [roadmap, setRoadmap] = useState([]);
    const [deleteCat, setDeleteCat] = useState(false);
    const [order, setOrder] = useState([]);
    const [count, setCount] = useState(false);

    const handleClose = () => setOpen(false);


    useEffect(() => {
        axios.get(`${host}/order/AOView`)
            .then((res) => {
                console.log(res.data)
                setOrder(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [count])

    console.log(order,"order")


  return (
<div style={{ height: '100vh' }}>
    <Paper sx={{ padding: '20px 20px 20px 20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ mb: 2, color: 'gray', fontWeight: '500' }}>Manage Payment</Typography>
        </Box>
        <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Si/No</StyledTableCell>
                        <StyledTableCell align="center">User Details</StyledTableCell>
                        <StyledTableCell align="center">Product Details</StyledTableCell>
                        <StyledTableCell align="center">Paid Total Amount </StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.map((row, index) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Name: </b>{row.name}<br />
                                <b>Email: </b>{row.email} <br />
                                <b>Phone: </b>{row.phone}<br />
                                <b>Address: </b>{row.address}, {row.city}, {row.country}, {row.zip}.
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.dish_id.map((dish) => (
                                    <div key={dish._id}>
                                        <b>Product Name: </b>{dish.dish_id.name}<br />
                                        <b>Product Price: </b>{dish.dish_id.price}<br />
                                        <b>Quantity: </b>{dish.qty}
                                    </div>
                                ))}
                            </StyledTableCell>
                            <StyledTableCell align="center"><b>{row.grandtotal}</b></StyledTableCell>
                            <StyledTableCell align="center">
                            
                                    <Button >Paid</Button>
                              
                              
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    </Paper>
</div>
  )
}

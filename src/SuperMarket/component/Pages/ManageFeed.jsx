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
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function ManageFeed() {


    const host = "http://127.0.0.1:7001";
    let navigate = useNavigate()

    const [Cat, setCat] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState('');
    const [roadmap, setRoadmap] = useState([]);
 
    const [feed, setFeed] = useState([]);
    const [count, setCount] = useState(false);
    const [deleteCat, setDeleteCat] = useState(false);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        axios.get(`${host}/feedback/View`, )
            .then((res) => {
                console.log(res.data)
                setFeed(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [count])

    console.log(feed,"feed")

    const handleDelete = async (id) => {
        setCount(true);
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this category',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${host}/feedback/delete/${id}`)
                    .then((response) => {
                        setDeleteCat(!deleteCat)
                        console.log("Insert Response : " + response.data.name);
                        setCount(false);
                    })
                    .catch((err) => {
                        console.log("Error : " + err);
                        setCount(false);
                    })
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            }
        });
    };



  return (
    <div style={{ height: '100vh' }}>
    <Paper sx={{ padding: '20px 20px 20px 20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ mb: 2, color: 'gray', fontWeight: '500' }}>Manage Feedback</Typography>
        </Box>
        <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Si/No</StyledTableCell>
                        <StyledTableCell align="center">User Details</StyledTableCell>
                        {/* <StyledTableCell align="center">Product Details</StyledTableCell> */}
                        <StyledTableCell align="center">Title </StyledTableCell>
                        <StyledTableCell align="center">Feedback  </StyledTableCell>
                        <StyledTableCell align="center"> Rating </StyledTableCell>

                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feed?.map((row, index) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">
                                <b>Name: </b>{row?.u_id?.name}<br />
                                <b>Email: </b>{row.u_id?.email} <br />
                                <b>Phone: </b>{row.u_id?.phone}<br />
                               
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.title}
                            </StyledTableCell>
                            <StyledTableCell align="center"><b>{row.feedback}</b></StyledTableCell>
                            <StyledTableCell align="center"><b> <Rating
        name="rating"
        value={row.rating}
      readOnly
      /></b></StyledTableCell>

<StyledTableCell align="center">
    <Button onClick={() => handleDelete(row._id)} ><DeleteIcon/></Button>
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

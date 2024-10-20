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
export default function Managecat() {

    const host = "http://127.0.0.1:7001";


    const [Cat, setCat] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState('');
    const [roadmap, setRoadmap] = useState([]);
    const [deleteCat, setDeleteCat] = useState(false);

    const handleClose = () => setOpen(false);


    useEffect(() => {
        axios.get(`${host}/category/view`)
            .then((res) => {
                console.log(res.data)
                setCat(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [deleteCat])


    const handleOpen = (index) => {
        setOpen(true)
        setDescription(Cat[index].description);
        setRoadmap(Cat[index].roadmap)
    }



    
    const handleDelete = async (id) => {
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
                axios.delete(`${host}/category/delete/${id}`)
                    .then((response) => {
                        setDeleteCat(!deleteCat)
                        console.log("Insert Response : " + response.data.name);
                    })
                    .catch((err) => {
                        console.log("Error : " + err);
                    })
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            }
        });
    };


  return (
    <div style={{ height: '100vh' }}>

        
            <Paper sx={{ padding: '20px 20px 20px 20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h6' sx={{ mb: 2, color: 'gray', fontWeight: '500' }}>Manage Category</Typography>
                    <Link to='/admin/addcat'>
                        <Button variant='contained' color='success' sx={{ backgroundColor: 'gray' }} startIcon={<AddIcon />} size='small'>Add Cat</Button>
                    </Link>
                </Box>
                <TableContainer >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Si/No</StyledTableCell>
                                <StyledTableCell align="center">Title</StyledTableCell>
                               
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Cat.map((row, index) => (
                                <StyledTableRow key={row.name}>
                                  
                                    <StyledTableCell align="center">{index+1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                  
                                    <StyledTableCell align="center">
                                        <Link to={`/admin/updatecat/${row._id}`}><IconButton><BorderColorIcon /></IconButton></Link>
                                        <IconButton onClick={() => handleDelete(row._id)}><DeleteOutlineIcon /></IconButton>
                                        </StyledTableCell>

                                </StyledTableRow>
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
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: '600', color: 'grey' }}>
                            Cat Description
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {description}
                        </Typography>

                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: '600', color: 'grey', mt: 3 }}>
                            Cat Roadmap
                        </Typography>
                        <ul>
                            {roadmap.map((i) => (
                                <li>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        {i}
                                    </Typography>
                                </li>

                            ))}
                        </ul>
                    </Box>
                </Modal>
            </Paper>
        </div>
  )
}

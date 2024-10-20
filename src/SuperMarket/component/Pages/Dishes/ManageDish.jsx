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
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import  {MenuItem, Menu} from '@mui/material';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

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
export default function ManageDish() {

     const [expanded, setExpanded] = useState(Array(6).fill(false));

     const handleExpandClick = (index) => {
        setExpanded((prevExpanded) =>
          prevExpanded.map((item, i) => (i === index ? !item : item))
        );
      };

     
    

    const host = "http://127.0.0.1:7000";


    const [Dish, setDish] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [description, setDescription] = useState('');
    const [roadmap, setRoadmap] = useState([]);
    const [deleteCat, setDeleteDish] = useState(false);

    const handleClose = () => setOpen(false);


    useEffect(() => {
        axios.get(`${host}/dishes/view`)
            .then((res) => {
                console.log(res.data)
                setDish(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [deleteCat])


    const handleOpen = (index) => {
        setOpen(true)
        setDescription(Dish[index].description);
        setRoadmap(Dish[index].roadmap)
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
                axios.delete(`${host}/dishes/delete/${id}`)
                    .then((response) => {
                        setDeleteDish(!deleteCat)
                        console.log("Insert Response : " + response.data.name);
                    })
                    .catch((err) => {
                        console.log("Error : " + err);
                    })
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            }
        });
    };


    const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

    return (
        <div style={{ height: '100vh' }}>
        <Paper sx={{ padding: '20px 20px 20px 20px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ mb: 2, color: 'gray', fontWeight: '500' }}>Manage Dish</Typography>
            <Link to='/admin/adddish'>
              <Button variant='contained' color='success' sx={{ backgroundColor: 'gray' }} startIcon={<AddIcon />} size='small'>Add Product</Button>
            </Link>
          </Box>
  
          <Grid container spacing={2}>
            {Dish.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    // avatar={
                    //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    //     D
                    //   </Avatar>
                    // }
                    action={
                      <IconButton aria-label="settings"  onClick={(event) => handleMenuClick(event, index)}>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={card.name}
                    subheader={card?.meal_type?.name}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={`http://localhost:7000/upload/${card?.image}`}
                    alt="Paella dish"
                  />
                  <CardContent>
                  <CardHeader  
                   title={`₹ ${card?.price}`}
                    subheader={card?.dietary_type} />
               
                
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      aria-label="show more"
                      onClick={() => handleExpandClick(index)}
                      aria-expanded={expanded[index]}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded[index]} timeout="auto" unmountOnExit>

                  <CardContent>
                      <Typography paragraph><b>Nutrition Facts:</b></Typography>
                     
                      <Typography paragraph>
                     
                      <b>Calories:</b> {card?.Calories}
                      </Typography>
                      <Typography paragraph>
                      <b>Total Carbohydrate:</b> {card?.TotalCarbohydrate}
                      </Typography>
                      <Typography paragraph>
                      <b>Total Carbohydrate:</b> {card?.TotalCarbohydrate}
                      </Typography>
                      <Typography paragraph>
                     <b> Protein:</b>  {card?.Protein}
                      </Typography>
                      <Typography paragraph>
                     <b> Total Fat:</b>  {card?.TotalFat}
                      </Typography>
                       
                    </CardContent>

                    <CardContent>
                      <Typography paragraph><b>Ingredients:</b></Typography>
                      {(card?.ingredients).map((item, idx) => (
                      <Typography paragraph>
                          {item?.ingredients}
                          
                      </Typography>
                          ))} 
                    </CardContent>


                    <CardContent>
                      <Typography paragraph><b>preparation_Instruction:</b></Typography>
                      {card.preparation_Instruction.map((preparation_Instruction, idx) => (
                      <Typography paragraph>
                          {preparation_Instruction.preparation_Instruction}
                      </Typography>
                          ))}
                    </CardContent>

                  </Collapse>
                </Card>


                <Menu
            anchorEl={anchorEl}
            open={menuIndex === index}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleDelete(card._id)}>Delete</MenuItem>
            <Link to={`/admin/dishUp/${card._id}`}> <MenuItem style={{ textDecoration: 'none',color: 'bl    ack',}} >Update</MenuItem></Link>
          </Menu>

              </Grid>
            ))}
          </Grid>


        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: '600', color: 'grey' }}>
                    Dish Description
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {description}
                </Typography>

                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: '600', color: 'grey', mt: 3 }}>
                    Dish Roadmap
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

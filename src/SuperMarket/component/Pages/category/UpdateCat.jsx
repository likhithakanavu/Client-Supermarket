import React, { useState,useEffect,useCallback } from 'react';
import { Box, Paper, Grid, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams,useNavigate } from 'react-router-dom';

export default function UpdateCat() {

    const host = "http://127.0.0.1:7000";
    const [Cat, setCat] = useState([]);
    const [CatDetails, setCatDetails] = useState([]);
    const [fields, setFields] = useState([{ roadmap: '' }]);
    const [chapters, setChapters] = useState([{ title: '', content: '', description: '' }]);
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);


    const { id } = useParams();
    const nav = useNavigate();
    const [dbChapter, setDbChapters] = useState([]);

    useEffect(() => {
        axios.get(`${host}/category/SingleCat/${id}`)
            .then((res) => {
                console.log(res.data, 'setChapters')
                setCatDetails(res.data.job);
               
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    console.log(chapters,66)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
  
        setOpen(false);
    };




    const handleCatDetails = (e) => {
        setCatDetails({ ...CatDetails, [e.target.name]: e.target.value });
    }

    console.log(CatDetails, 'coueseDetails')


    const handleAddField = () => {
        setFields([...fields, { roadmap: '' }]);
    };



    const [errors, setErrors] = useState({});

    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        if (!CatDetails.name) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }, [CatDetails]);


    const handleRemoveField = (index) => {
        const values = [...fields];
        values.splice(index, 1);
        setFields(values);
    };

    // const handleChange = (index, event) => {
    //     const values = [...fields];
    //     values[index][event.target.name] = event.target.value;
    //     setFields(values);
    // };

    // const handleChange = (index, event) => {
    //     const values = [...fields];
    //     values[index] = event.target.value ;
    //     setFields(values);
    // };

    const handleChange = (index, event) => {
        const values = [...fields];
        values[index] = { ...values[index], roadmap: event.target.value };
        setFields(values);
    };


    console.log(fields, 9090)

    const handleAddChapter = () => {
        setChapters([...chapters, { title: '', content: '', description: '' }]);
    };

    const handleRemoveChapter = (index) => {
        const values = [...chapters];
        values.splice(index, 1);
        setChapters(values);
    };

    const handleChangeChapter = (index, event) => {
        const values = [...chapters];
        // if (event.target.name == 'content') {
        //     values[index][event.target.name] = event.target.files[0];
        // } else {
            values[index][event.target.name] = event.target.value;
        // }
        setChapters(values);
    };
    console.log(chapters)



    const handleImage = (e) => {
        // setImgError(false);
        setImage({ ...image, [e.target.name]: e.target.files[0] });
    };



    console.log(fields, 98)

    const handleSubmit = () => {

        axios.put(`${host}/category/update/${id}`, CatDetails)
            .then((res) => {
                if (res.data) {
                    console.log(res.data,'respone')
                    setOpen(true);
                    setTimeout(async()=>{
                        await nav('/admin/managecat');
                         
                    },1000)
                } else {
                    console.log("some error occured")
                }

            })
            .catch((err) => {
                console.log(err)
            })

    }


  return (
    <div style={{ height: '100%' }}>
    <Paper> 
        <Box sx={{ backgroundColor: '#f0f1f6', padding: '2px 15px' }}>
            <p style={{ color: 'rgb(82, 95, 127)', fontWeight: '400', fontSize: '15px' }}>Update Category Details</p>
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
                            value={CatDetails.name}
                            error={!!errors.title}
                            helperText={errors.title}
                           InputLabelProps={{shrink:true}}
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
        autoHideDuration={4000} // Set auto hide duration to 4000 milliseconds (4 seconds)
        onClose={handleClose} // Call handleClose2 when Snackbar should close
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position the Snackbar at the top right
    >
        <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
        >
            Category Updated!
        </Alert>
    </Snackbar>
</div>
  )
}

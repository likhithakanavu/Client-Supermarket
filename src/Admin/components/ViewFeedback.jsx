import React,{useEffect,useState}from 'react'
import axios from 'axios';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2'
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ClearIcon from '@mui/icons-material/Clear';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Box, Button } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';

export default function ViewFeedback() {
    const host = "http://localhost:7001";
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [deleteCat, setDeleteCat] = useState(false);
    useEffect(() => {
        axios.get(`${host}/feedback/View`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [deleteCat]);


    console.log(data,"dadada")

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColour:'white'
    };

    const thStyle = {
       background: 'linear-gradient(to top, white, grey)',
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left'
    };

    const tdStyle = {
        padding: '10px',
        border: '1px solid',
        textAlign: 'left',
         background:'white'
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer'
    };


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
                axios.delete(`${host}/feedback/delete/${id}`)
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
    <div>
      <table style={tableStyle} >
                <thead>
                    <tr>
                    <th style={thStyle}>SI/NO</th>

                        <th style={thStyle}> User Name details</th>
                        <th style={thStyle}>Product Details</th>
                        <th style={thStyle}> Rating</th>
                        <th style={thStyle}>Feedback Message</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,i) => (
                        <tr key={item.id}>
                            <td style={tdStyle}>{i+1}</td>

                            <td style={tdStyle}>name:{item?.u_id?.name}<br/>
                            email: {item?.u_id?.email}<br/>
                            phone: {item?.u_id?.phone}<br/></td>
                            <td style={tdStyle}> product name: {item?.p_id?.name} </td>
                            {/* <td style={tdStyle}>{item.address}</td> */}
                           
                            <td style={tdStyle}> 
                            <Rating
        name="simple-controlled"
        value={item?.rating}
      
      />              
                            </td>
                            <td style={tdStyle}>
                                {item?.feedback}
                            </td>
                            <td style={tdStyle}>
   
                                  <IconButton onClick={() => handleDelete(item?._id)}><DeleteOutlineIcon /></IconButton>
               
                            </td>

                            
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

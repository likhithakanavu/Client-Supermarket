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
export default function ManagesuperM() {
    let navigate = useNavigate()
    const host = "http://localhost:7001";
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [deleteCat, setDeleteCat] = useState(false);
    const [count, setCount] = useState(false);

    useEffect(() => {
        axios.get(`${host}/SuperM/view`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [count]);

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
        setCount(false)
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
                axios.delete(`${host}/SuperM/delete/${id}`)
                    .then((response) => {
                       
                        setDeleteCat(!deleteCat)
                        console.log("Insert Response : " + response.data.name);
                        setCount(true)
                    })
                    .catch((err) => {
                        console.log("Error : " + err);
                    })
                Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            }
        });
    };


    const hendleAccept = (id) => {
        console.log("Accept: ", id);
       
        setCount(false);
        const action = { action: "Accept" };
        axios.put(`${host}/SuperM/update/${id}`, action)
            .then((res) => {
                if (res.data) {
                    console.log(res.data, 'response');
                    // setOpen(true);
                    setTimeout(async () => {
                        await navigate('/admin');
                    }, 1000);
                    setCount(true);
                } else {
                    console.log("Some error occurred");
                    setCount(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setCount(true);
            });
    };

    const hendleReject = (id) => {
        console.log("Reject: ", id);
        setCount(false);
        const action = { action: "Reject" };
        axios.put(`${host}/SuperM/update/${id}`, action)
            .then((res) => {
                if (res.data) {
                    console.log(res.data, 'response');
                    // setOpen(true);
                    setTimeout(async () => {
                        await navigate('/admin');
                    }, 1000);
                    setCount(true);
                } else {
                    console.log("Some error occurred");
                    setCount(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setCount(true);
            });
    };


  return (
    <div>
      <table style={tableStyle} >
                <thead>
                    <tr>
                    <th style={thStyle}>SI/NO</th>

                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        {/* <th style={thStyle}> Address</th> */}
                        <th style={thStyle}>Phone</th>
                        {/* <th style={thStyle}>Password</th> */}
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,i) => (
                        <tr key={item.id}>
                            <td style={tdStyle}>{i+1}</td>

                            <td style={tdStyle}>{item.name}</td>
                            <td style={tdStyle}>{item.email}</td>
                            {/* <td style={tdStyle}>{item.address}</td> */}
                            <td style={tdStyle}>{item.phone}</td>
                            <td style={tdStyle}> 
                                
                            {item?.status === 'Accept' ? (
                            
                                    <>
                                                                      <Button><ThumbUpAltIcon /></Button>
                                                                      <IconButton onClick={() => handleDelete(item?._id)}><DeleteOutlineIcon /></IconButton>

                                    </>
                                 
                                ) : item?.status === 'Reject' ? (
                                    
                                    <>
                                  <Button><ThumbDownAltIcon /></Button>
                                  <IconButton onClick={() => handleDelete(item?._id)}><DeleteOutlineIcon /></IconButton>

                                    </>
                                   
                                ) : (
                                    <>
                                        <Button onClick={() => hendleAccept(item._id)}><OfflinePinIcon /></Button>
                                        <Button onClick={() => hendleReject(item._id)}><ClearIcon /></Button>
                                    </>
                                )}
                                
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

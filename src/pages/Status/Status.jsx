import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Header from '../../components/home/Header/Header';
import Footer from '../../components/home/Footer/Footer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Status() {

    const host = 'http://127.0.0.1:7001';
    const navigate = useNavigate();
    const [status, setStatus] = useState([]);
    const [rating, setRating] = useState(0);
    const [basicModal, setBasicModal] = useState(false);
    const [count, setCount] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [feed, setFeed] = useState({
     
      feedback: '',
    });
  
    useEffect(() => {
      if (localStorage.getItem('UserToken') === null) {
        navigate('/login');
      }
    }, [navigate]);
  
    useEffect(() => {
      const token = JSON.parse(localStorage.getItem('UserToken'));
      axios.get(`${host}/order/get`, { headers: { 'auth-token': token } })
        .then(res => setStatus(res.data))
        .catch(err => console.log(err));
    }, [count]);
  
    const grandTotal = status.reduce((sum, order) => {
      const orderTotal = order.p_id.reduce((orderSum, pro) => {
        return orderSum + (pro.p_id.price * pro.qty);
      }, 0);
      return sum + orderTotal;
    }, 0);
  
    const handleRatingChange = (event, newValue) => {
      setRating(newValue);
    };
  
    const toggleOpen = () => {
      console.log('Toggling modal. Current state:', basicModal);
      setBasicModal(!basicModal);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleFeedbackChange = (e) => {
      setFeed({ ...feed, [e.target.name]: e.target.value });
    };
  
    const handleSubmitFeedback = () => {
      const token = JSON.parse(localStorage.getItem('UserToken'));
      const data = { ...feed, rating };
  
      axios.post('http://localhost:7001/feedback/feed', data, { headers: { 'auth-token': token } })
          .then(res => {
              if (res.data.success) {
                  alert(res.data.message); // Feedback submitted successfully
                  toggleOpen();
                  setOpen(false);
              }
          })
          .catch(err => {
              // Logging the full error response to troubleshoot
              console.error('Axios error:', err.response);
  
              if (err.response && err.response.data && err.response.data.message) {
                  alert(err.response.data.message); // Feedback already exists or internal error
              } else {
                  alert("An unexpected error occurred.");
              }
          });
  };
  
  
    
    const Handlecancel = (id) => {
      // alert("hi")
      console.log('Reject: ', id);
      const action = { action: 'Reject' };
      setCount(true);
      axios.put(`${host}/order/update/${id}`, action)
        .then(res => {
          if (res.data.success) {
            console.log(res.data, 'response');
            setTimeout(async () => {
              await navigate('/status');
            }, 1000);
            setCount(true);
          } else {
            console.log('Some error occurred');
            setCount(false);
          }
        })
        .catch(err => {
          console.log(err);
          setCount(false);
        });
    };
    
  
    const handleOpen = () => {
      setOpen(true);
    };
  
  return (
    <div>
   <Header/>
      <section className="h-100 gradient-custom"style={{backgroundColor:"#f5fffa"}}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="12">
              <MDBCard style={{ borderRadius: '10px' }}>
                <MDBCardHeader className="px-4 py-5">
                  <MDBTypography tag="h5" className="text-muted mb-0">
                   <b> Thanks for your Order </b> <span style={{ color: '#a8729a' }}>{status?.name}</span>!
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    {/* <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}>
                      Receipt
                    </p> */}
                  </div>

                  {status?.length > 0 ? (
                    <MDBCard className="shadow-0 border mb-4">
                      {status?.map((item) => (
                        <MDBRow key={item._id}>
                          {item.p_id.map((pro) => (
                            <MDBCardBody key={pro._id}>
                              <MDBRow>
                                <MDBCol md="2">
                                  <MDBCardImage
                                    src={`http://localhost:7001/upload/${pro?.p_id?.image}`}
                                    fluid
                                    alt="pro"
                                  />
                                </MDBCol>
                                <MDBCol
                                  md="2"
                                  className="text-center d-flex justify-content-center align-items-center"
                                >
                                  <p className="text-muted mb-0">{pro?.p_id?.name}</p>
                                </MDBCol>
                                <MDBCol
                                  md="2"
                                  className="text-center d-flex justify-content-center align-items-center"
                                >
                                  <p className="text-muted mb-0 small">Qty: {pro?.qty}</p>
                                </MDBCol>
                                <MDBCol
                                  md="2"
                                  className="text-center d-flex justify-content-center align-items-center"
                                >
                                  <p className="text-muted mb-0 small">₹{pro?.p_id?.price}</p>
                                </MDBCol>
                                <MDBCol
                                  md="2"
                                  className="text-center d-flex justify-content-center align-items-center"
                                >
                                  <p className="text-muted mb-0 small">{`Total: ₹${pro?.qty * pro?.p_id?.price}`}</p>
                                </MDBCol>
                                <MDBCol
                                  md="2"
                                  className="text-center d-flex justify-content-center align-items-center"
                                >
                                  {item?.status === 'Delivered' ? (
                                    <Button variant="contained">Delivered</Button>
                                  ) : item.status === 'Reject' ? (
                                    <Button variant="outlined" color="error">Cancelled</Button>
                                  ) : (
                                    <Button onClick={() => Handlecancel(item?._id)} variant="outlined" color="error">Cancel</Button>
                                  )}
                                </MDBCol>
                              </MDBRow>
                              <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                              <MDBRow className="align-items-center">
                                <MDBCol md="2">
                                  <p className="text-muted mb-0 small">Track Order</p>
                                </MDBCol>
                                <MDBCol md="10">
                                  <MDBProgress style={{ height: '6px', borderRadius: '16px' }}>
                                    {item?.status === 'Accept' && (
                                      <MDBProgressBar
                                        style={{ borderRadius: '16px', backgroundColor: '#a8729a' }}
                                        width={35}
                                        valuemin={0}
                                        valuemax={100}
                                      />
                                    )}
                                    {item?.status === 'Delivered' && (
                                      <MDBProgressBar
                                        style={{ borderRadius: '16px', backgroundColor: '#7DDA58' }}
                                        width={100}
                                        valuemin={0}
                                        valuemax={100}
                                      />
                                    )}
                                    {item?.status === 'Reject' && (
                                      <MDBProgressBar
                                        style={{ borderRadius: '16px', backgroundColor: '#E4080A' }}
                                        width={100}
                                        valuemin={0}
                                        valuemax={100}
                                      />
                                    )}
                                    {item?.status !== 'Accept' && item?.status !== 'Delivered' && item?.status !== 'Reject' && (
                                      <MDBProgressBar
                                        style={{ borderRadius: '16px', backgroundColor: '#66cdaa' }}
                                        width={10}
                                        valuemin={0}
                                        valuemax={100}
                                      />
                                    )}
                                  </MDBProgress>
                                  <div className="d-flex justify-content-around mb-1" >
                                    <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                      {item?.status === 'Reject' ? 'Cancelled' : item?.status === 'Delivered' ? 'Delivered' : 'Out for delivery'}
                                    </p>
                                  </div>
                                </MDBCol>
                              </MDBRow>
                            </MDBCardBody>
                          ))}
                        </MDBRow>
                      ))}
                    </MDBCard>
                  ) : (
                    <Typography variant="h6" color="textSecondary">No orders found.</Typography>
                  )}

                  <div className="d-flex justify-content-between pt-2" >
                    <p className="fw-bold mb-0">Order Details</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Grand Total</span> ₹{grandTotal.toFixed(2)}
                    </p>
                  </div>
                </MDBCardBody>
                <MDBCardFooter
                  className="border-0 px-4 py-3"
                  style={{
                    backgroundColor: '#66cdaa',
                    borderBottomLeftRadius: '5px',
                    borderBottomRightRadius: '5px',
                  }}
                >
                  <MDBTypography tag="h5" className="text-light mb-0">
                    Total Amount: ₹{grandTotal.toFixed(2)}
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
   

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Feedback</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  margin="normal"
                  label="Title"
                  name="title"
                  onChange={handleFeedbackChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Feedback"
                  name="feedback"
                  onChange={handleFeedbackChange}
                />
                <Box sx={{ width: 200, mt: 2 }}>
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                  />
                </Box>
              </Box>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>Close</MDBBtn>
              <MDBBtn onClick={handleSubmitFeedback}>Submit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <Box component="form" noValidate autoComplete="off">
               
                <TextField
                  fullWidth
                  margin="normal"
                  label="Feedback"
                  name="feedback"
                  onChange={handleFeedbackChange}
                />
                <Box sx={{ width: 200, mt: 2 }}>
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                  />
                </Box>
              </Box>


              <MDBModalFooter>
              <MDBBtn color="secondary"onClick={handleClose}>Close</MDBBtn>
              <MDBBtn onClick={handleSubmitFeedback}>Submit</MDBBtn>
            </MDBModalFooter>
        </Box>
      </Modal>

      <Footer/>
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload } from "react-icons/fa";
import axios from "axios";
import Header from "../../components/home/Header/Header";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import Footer from "../../components/home/Footer/Footer";
import { Button, TextField, Box, Modal, Typography, Rating } from "@mui/material";

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

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState(null); // Initialize as null
  const [activeTab, setActiveTab] = useState('Fiche Technique');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("UserToken") == null) {
      navigate("/signin");
    }
  }, []);

  const [ProductDetails, setProductDetails] = useState({});
  const host = "http://127.0.0.1:7001";
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${host}/product/Singleproduct/${id}`)
      .then((res) => {
        console.log(res.data.data, "setProduct");
        setProductDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [ratingState, setRatingState] = useState({
    rating: ""
  });

  const handleRatingChange = (event, newValue) => {
    setRatingState({
      ...ratingState,
      rating: newValue // Update the rating value in the state object
    });
  };

  const [feed, setFeed] = useState({
    feedback: ""
  });

  const handleFeedbackChange = (e) => {
    setFeed({ ...feed, [e.target.name]: e.target.value });
  };

  const handleFeedbackSubmit = (id) => {
    let token = JSON.parse(localStorage.getItem('UserToken'));
    let data = { ...feed, ...ratingState, id };

    axios
      .post("http://127.0.0.1:7001/feedback/feed", data, { headers: { "auth-token": token } })
      .then((res) => {
        if (res.data.success) {
          // alert("Feedback submitted successfully!");
          setRatingState({ rating: "" });
          setFeed({ feedback: "" });
          handleClose();
        }else{
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <>
      <Header />
      <HeaderBottom />
      <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
        <div className="max-w-container mx-auto px-4">
          <div className="xl:-mt-10 -mt-7">
            <Breadcrumbs title="" prevLocation={prevLocation} />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
            <div className="h-full xl:col-span-2">
              <img
                className="w-full h-full"
                src={`http://localhost:7001/upload/${ProductDetails.image}`}
                alt={`http://localhost:7001/upload/${ProductDetails.image}`}
              />
            </div>
            <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
              <ProductInfo productInfo={ProductDetails} />
            </div>
          </div>
          <div>
            <br />
            <div className="space-x-4 pt-4">
              <Button onClick={handleOpen} className="bg-gray-200 text-gray-800 py-2 px-4 focus:outline-none">
                Feedback
              </Button>
            </div>
            <br />
            <br />

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="feedback-modal-title"
              aria-describedby="feedback-modal-description"
            >
              <Box sx={{ ...style, width: 500 }}>
                <Typography id="feedback-modal-title" variant="h6" component="h2">
                  Leave Feedback
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={ratingState.rating}
                    onChange={handleRatingChange}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Feedback"
                    name="feedback"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={feed.feedback}
                    onChange={handleFeedbackChange}
                  />
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
                  <Button variant="contained" onClick={()=>handleFeedbackSubmit(ProductDetails._id)}>Submit</Button>
                </Box>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

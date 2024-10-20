import React from "react";
import { Box, Paper, Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from '@mui/material/FormHelperText';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Addproduct() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("SupermToken") == null) {
      navigate("/smlogin");
    }
  }, []);
  
  const host = "http://127.0.0.1:7001";
  const [ProductDetails, setProductDetails] = useState({
    name: "", c_id: "", description: "", stock: "", qty: "", price: "", unit: "",
  });
  
  const [fields, setFields] = useState([{ ingredients: "" }]);
  const [Instruction, setInstruction] = useState([{ Instruction: "" }]);
  const [Nutritionfacts, setNutritionFacts] = useState([{ Nutritionfacts: "" }]);
  
  const [Cat, setCat] = useState([]);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleProductDetails = (e) => {
    setProductDetails({ ...ProductDetails, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleAddField = () => {
    setFields([...fields, { ingredients: "" }]);
  };

  const handleAddField2 = () => {
    setInstruction([...Instruction, { Instruction: "" }]);
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleRemoveField2 = (index) => {
    const values = [...Instruction];
    values.splice(index, 1);
    setInstruction(values);
  };

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleChange2 = (index, event) => {
    const values = [...Instruction];
    values[index][event.target.name] = event.target.value;
    setInstruction(values);
  };

  const handleImage = (e) => {
    setImage({ ...image, [e.target.name]: e.target.files[0] });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

//   console.log(ProductDetails,"ProductDetails")

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!ProductDetails.name) {
      newErrors.name = "Title is required";
      isValid = false;
    }
    if (!image.image) {
      newErrors.image = "Image is required";
      isValid = false;
    }
    if (!ProductDetails.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!ProductDetails.stock) {
      newErrors.stock = "Stock is required";
      isValid = false;
    }
    if (!ProductDetails.qty) {
      newErrors.qty = "Quantity is required";
      isValid = false;
    }
    if (!ProductDetails.unit) {
      newErrors.unit = "Unit is required";
      isValid = false;
    }
    if (!ProductDetails.price) {
      newErrors.price = "Price is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    axios
      .get(`${host}/category/view`)
      .then((res) => {
        setCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = () => {
    console.log("Submitting data");

    if (!validateForm()) {
        return;
    }

    const Data = new FormData();
    Data.append("c_id", ProductDetails.c_id);
    Data.append("name", ProductDetails.name);
    Data.append("description", ProductDetails.description);
    Data.append("stock", ProductDetails.stock);
    Data.append("qty", ProductDetails.qty);
    Data.append("unit", ProductDetails.unit);
    Data.append("price", ProductDetails.price);
    Data.append("image", image.image);

    let token = JSON.parse(localStorage.getItem('SupermToken'));
    console.log("Token:", token);

    axios.post(`${host}/product/insert`, Data, { headers: { "auth-token": token } })
        .then((res) => {
            if (res.data.success) {
                setOpen(true);
                console.log("Product added successfully:", res.data);
            } else {
                // Show error message from server
                setErrors((prev) => ({
                    ...prev,
                    name: res.data.message || "An error occurred",
                }));
            }
        })
        .catch((err) => {
            console.error("Error submitting data:", err);
            setErrors((prev) => ({
                ...prev,
                name: "Failed to add product",
            }));
        });
};



  return (
    <div style={{ height: "100%" }}>
      <Paper>
        <Box
          sx={{
            backgroundColor: "#f0f1f6",
            padding: "2px 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "rgb(82, 95, 127)",
              fontWeight: "400",
              fontSize: "15px",
            }}
          >
            Insert Dish Details
          </p>
          <Link to="/superM/mproduct">
            <Button size="small" endIcon={<ArrowForwardIosIcon />}>
              View Product
            </Button>
          </Link>
        </Box>

        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="category"
                name="c_id"
                value={ProductDetails.c_id || ""}
                onChange={handleProductDetails}
              >
                {Cat.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.c_id}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Title"
              name="name"
              onChange={handleProductDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              InputLabelProps={{ shrink: "none" }}
              name="image"
              onChange={handleImage}
              id="outlined-basic"
              label="Upload Thumbnail"
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.image}
              helperText={errors.image}
            />
          </Grid>

         

        
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Quantity"
              name="qty"
              onChange={handleProductDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.qty}
              helperText={errors.qty}
            />
          </Grid>
          <Grid item xs={12} md={6}>
  <FormControl variant="outlined" size="small" fullWidth error={!!errors.unit}>
    <InputLabel id="select-unit-label">Unit</InputLabel>
    <Select
      labelId="select-unit-label"
      id="select-unit"
      name="unit"
      onChange={handleProductDetails}
      label="Unit"
      value={ProductDetails.unit}
    >
    <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="KG">KG</MenuItem>
                <MenuItem value="G">G</MenuItem>
                <MenuItem value="ML">ML</MenuItem>
                <MenuItem value="Liter">liter</MenuItem>
                <MenuItem value="Pieces">Pieces</MenuItem>
      {/* Add more options as needed */}
    </Select>
    <FormHelperText>{errors.unit}</FormHelperText>
  </FormControl>
</Grid>


          

          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Price"
              name="price"
              onChange={handleProductDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="outlined-basic"
              label="Stock"
              name="stock"
              onChange={handleProductDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.stock}
              helperText={errors.stock}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Description"
              name="description"
              onChange={handleProductDetails}
              variant="outlined"
              size="small"
              multiline
              rows={2}
              fullWidth
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ p: 3, width: "400px" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Product Inserted!
        </Alert>
      </Snackbar>
    </div>
  )
}

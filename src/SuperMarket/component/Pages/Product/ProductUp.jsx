import React, { useEffect, useState } from "react";
import { Box, Paper, Grid, TextField, Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DishUp() {
  const navigate = useNavigate();
  const { id } = useParams();
  const host = "http://127.0.0.1:7001";
  
  const [ProductDetails, setProductDetails] = useState({
    name: "", c_id: "", description: "", stock: "", qty: "", price: "", unit: "",
  });
  const [Cat, setCat] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("SupermToken")) {
      navigate("/smlogin");
    }
  }, [navigate]);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('SupermToken'));
    axios.get(`${host}/product/Singleproduct/${id}`, { headers: { "auth-token": token } })
      .then((res) => {
        setProductDetails({
          name: res.data.data.name,
          c_id: res.data.data.c_id._id,
          description: res.data.data.description,
          stock: res.data.data.stock,
          qty: res.data.data.qty,
          price: res.data.data.price,
          unit: res.data.data.unit
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios.get(`${host}/category/view`)
      .then((res) => {
        setCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProductDetails = (e) => {
    setProductDetails({ ...ProductDetails, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!ProductDetails.name) {
      newErrors.name = "Title is required";
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

console.log(ProductDetails,"ProductDetails")

  const handleSubmit = () => {
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
    console.log(  Data.append("c_id", ProductDetails.c_id),"  Data.append ProductDetails.c_id;")

    let token = JSON.parse(localStorage.getItem('SupermToken'));
console.log(Data, "updateddata")
    axios.put(`${host}/product/update/${id}`, Data)
      .then((res) => {
        setSnackbar({ open: true, message: "Dish Updated!", severity: "success" });
        if (res.data) {
          navigate('/superM/mproduct');
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        setSnackbar({ open: true, message: "Failed to update dish.", severity: "error" });
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
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
            Updated Dish Details
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
                value={ProductDetails.c_id}
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
              value={ProductDetails.name}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
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
              value={ProductDetails.qty}
              fullWidth
              error={!!errors.qty}
              helperText={errors.qty}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.unit}>
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
              value={ProductDetails.price}
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
              value={ProductDetails.stock}
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
              value={ProductDetails.description}
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
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

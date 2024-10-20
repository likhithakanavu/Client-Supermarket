import React from "react";
import { Box, Paper, Grid, TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddDish() {
  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Side Dish",
    "Salad",
    "Soup",
  ];

  const dietaryTypes = [
    "Vegetarian",
    "Vegan",
    "Omnivore",
    "Pescatarian",
    "Paleo",
    "Keto",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Carb",
    "Low-Fat",
    "Mediterranean",
    "Whole30",
    "Diabetic-Friendly",
    "Heart-Healthy",
    "Plant-Based",
    "High-Protein",
    "Low-Sodium",
    "Raw Food",
    "Intermittent Fasting",
  ];

  const host = "http://127.0.0.1:7000";
  const [DishDetails, setDishDetails] = useState([
    {
      meal_type: "",
      name: "",
      cookTime: "",
      prep_time: "",
      dietary_type: "",
      extra_food: "",
      description: "",
      TotalFat:"",
      Protein:"",
      TotalCarbohydrate:"",
      Calories:"",
      price:"",
    },
  ]);
  const [fields, setFields] = useState([{ ingredients: "" }]);
  const [Instruction, setInstruction] = useState([{ Instruction: "" }]);
  const [Nutritionfacts, setNutritionFacts] = useState([
    { Nutritionfacts: "" },
  ]);

  const [chapters, setChapters] = useState();
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDishDetails = (e) => {
    setDishDetails({ ...DishDetails, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };
console.log(DishDetails,"satate")
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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!DishDetails.name) {
      newErrors.name = "Title is required";
      isValid = false;
    }
    if (!image.image) {
      newErrors.image = "image is required";
      isValid = false;
    }
    if (!DishDetails.extra_food) {
      newErrors.extra_food = "extra_food is required";
      isValid = false;
    }
    if (!DishDetails.prep_time) {
      newErrors.prep_time = "prep_time is required";
      isValid = false;
    }
    if (!DishDetails.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!DishDetails.cookTime) {
      newErrors.cookTime = "cookTime is required";
      isValid = false;
    }

    if (!DishDetails.TotalCarbohydrate) {
      newErrors.TotalCarbohydrate = "TotalCarbohydrate is required";
      isValid = false;
    }
    if (!DishDetails.TotalFat) {
      newErrors.TotalFat = "TotalFat is required";
      isValid = false;
    }
    if (!DishDetails.price) {
      newErrors.price = "Price is required";
      isValid = false;
    }
    if (!DishDetails.Calories) {
      newErrors.Calories = "Calories is required";
      isValid = false;
    }
    Instruction.forEach((field, index) => {
      if (!field.preparation_Instruction) {
        newErrors[`preparation_Instruction${index}`] = "preparation_Instruction is required";
        isValid = false;
      }
    });
   
    fields.forEach((field, index) => {
      if (!field.ingredients) {
        newErrors[`ingredients${index}`] = "ingredients is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const [Cat, setCat] = useState([]);

  useEffect(() => {
    axios
      .get(`${host}/category/view`)
      .then((res) => {
        console.log(res.data);
        setCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    } 

    const Data = new FormData();
    Data.append("name", DishDetails.name);
    Data.append("description", DishDetails.description);
    Data.append("cookTime", DishDetails.cookTime);
    Data.append("prep_time", DishDetails.prep_time);
    Data.append("extra_food", DishDetails.extra_food);
    Data.append("image", image.image);
    Data.append("meal_type",  DishDetails.meal_type);
    Data.append("dietary_type",  DishDetails.dietary_type);
    Data.append("Calories",  DishDetails.Calories);
    Data.append("price",  DishDetails.price);
  
    Data.append("TotalFat",  DishDetails.TotalFat);
    Data.append("Protein",  DishDetails.Protein);
    Data.append("TotalCarbohydrate",  DishDetails.TotalCarbohydrate);
    Data.append("ingredients", JSON.stringify(fields));
    Data.append("preparation_Instruction", JSON.stringify(Instruction));

    axios
      .post(`${host}/dishes/insert`, Data)
      .then((res) => { 
        if (res.data) {
          console.log(res.data, "data");
          setOpen(true);
        } else {
          console.log("some error occured");
        }
      })
      .catch((err) => {
        console.log(err);
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
          <Link to="/admin/managedish">
            <Button size="small" endIcon={<ArrowForwardIosIcon />}>
              View Dishes
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
              name="meal_type"
              value={DishDetails.meal_type || ""}
              onChange={handleDishDetails}
            >
              {Cat.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
       
        </Grid>

        <Grid item xs={12} md={6}>
          
          
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Dietary Types</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Dietary Types"
              name="dietary_type"
              value={DishDetails.dietary_type || ""}
              onChange={handleDishDetails}
            >
              {dietaryTypes.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
       
        </Grid>


          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Title"
              name="name"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              rows={2}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
              
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="file"
              InputLabelProps={{ shrink: "none" }}
              name="image"
              onChange={handleImage}
              id="outlined-basic"
              label="Upload Thumbnail"
              variant="outlined"
              size="small"
              rows={2}
              fullWidth
              error={!!errors.image}
              helperText={errors.image}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Extra_food"
              name="extra_food"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              rows={2}
              fullWidth
              error={!!errors.extra_food}
              helperText={errors.extra_food}
            />
          </Grid>
       

          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Prep_time"
              name="prep_time"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.prep_time}
              helperText={errors.prep_time}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="CookTime"
              name="cookTime"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              fullWidth
              error={!!errors.cookTime}
              helperText={errors.cookTime}
            />
          </Grid>

          <Grid  item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Calories"
              name="Calories"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              multiline
             
              fullWidth
              error={!!errors.Calories}
              helperText={errors.Calories}
            />
          </Grid>

          <Grid  item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Total Carbohydrate"
              name="TotalCarbohydrate"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              multiline
            
              fullWidth
              error={!!errors.TotalCarbohydrate}
              helperText={errors.TotalCarbohydrate}
            />
          </Grid>
          <Grid  item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Protein"
              name="Protein"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              multiline
             
              fullWidth
              error={!!errors.Protein}
              helperText={errors.Protein}
            />
          </Grid>

          <Grid  item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="TotalFat"
              name="TotalFat"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              multiline
             
              fullWidth
              error={!!errors.TotalFat}
              helperText={errors.TotalFat}
            />
          </Grid>


          <Grid  item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Price"
              name="price"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              multiline
             
              fullWidth
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>

         

          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Description"
              name="description"
              onChange={handleDishDetails}
              variant="outlined"
              size="small"
              multiline
              rows={2}
              fullWidth
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          {fields.map((field, index) => (
            <Grid item xs={12}  key={index}>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  id="outlined-basic"
                  label={`Ingredients ${index + 1}`}
                  variant="outlined"
                  size="small"
                  name="ingredients"
                  value={field.ingredients}
                  onChange={(event) => handleChange(index, event)}
                  fullWidth
                  error={!!errors[`ingredients_${index}`]}
                  helperText={errors[`ingredients_${index}`]}
                />
                {index > 0 && (
                  <IconButton
                    aria-label="remove"
                    variant="outlined"
                    size="small"
                    onClick={() => handleRemoveField(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} md={8}>
            <Button
              aria-label="add"
              variant="outlined"
              size="small"
              onClick={handleAddField}
            >
              <AddIcon />
              Add Field
            </Button>
          </Grid>

          {Instruction.map((field, index) => (
            <Grid item xs={12}  key={index}>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  id="outlined-basic"
                  label={`Preparation_Instruction ${index + 1}`}
                  variant="outlined"
                  size="small"
                  name="preparation_Instruction"
                  value={field.preparation_Instruction}
                  onChange={(event) => handleChange2(index, event)}
                  fullWidth
                  error={!!errors[`preparation_Instruction${index}`]}
                  helperText={errors[`preparation_Instruction${index}`]}
                />
                {index > 0 && (
                  <IconButton
                    aria-label="remove"
                    variant="outlined"
                    size="small"
                    onClick={() => handleRemoveField2(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
          ))}


          


          <Grid item xs={12} md={8}>
            <Button
              aria-label="add"
              variant="outlined"
              size="small"
              onClick={handleAddField2}
            >
              <AddIcon />
              Add Field
            </Button>
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
          Dish Inserted!
        </Alert>
      </Snackbar>
    </div>
  );
}

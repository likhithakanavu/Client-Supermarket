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
import { useParams,useNavigate } from 'react-router-dom';
export default function DishUp() {

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
        },
      ]);
      
      const [Instruction, setInstruction] = useState([{ Instruction: "" }]);
      const [Nutritionfacts, setNutritionFacts] = useState([
        { Nutritionfacts: "" },
      ]);
    
      const [chapters, setChapters] = useState();
      const [image, setImage] = useState("");
      const [open, setOpen] = useState(false);
      const [errors, setErrors] = useState({});
      const [Details, setDetails] = useState([]);

      const { id } = useParams();
      const nav = useNavigate();
      useEffect(() => {
        axios.get(`${host}/dishes/SingleDish/${id}`)
          .then((res) => {
            const data = res.data.data;
            console.log(data, 'setDish');
            setDishDetails({
              meal_type: data.meal_type,
              name: data.name,
              cookTime: data.cookTime,
              prep_time: data.prep_time,
              dietary_type: data.dietary_type,
              extra_food: data.extra_food,
              description: data.description,
              TotalFat: data.TotalFat,
              Protein: data.Protein,
              TotalCarbohydrate: data.TotalCarbohydrate,
              Calories: data.Calories,
              price: data.price
            });
      
            setInstruction(data.preparation_Instruction || []);
            setNutritionFacts(data.Nutritionfacts || []);
            setDetails(data.ingredients || []);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);
      
    const [fields, setFields] = useState(DishDetails?.ingredients || []);
    console.log(DishDetails,"dishdetails")
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
        values[index].ingredients = event.target.value;
        setDetails(values);
      };
      
      const handleChange2 = (index, event) => {
        const values = [...Instruction];
        values[index].preparation_Instruction = event.target.value;
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

    
   
      const handleSubmit = (id) => {
        if (!validateForm()) {
          return;
        }
      
        const Data = new FormData();
        Data.append("name", DishDetails.name);
        Data.append("description", DishDetails.description);
        Data.append("cookTime", DishDetails.cookTime);
        Data.append("prep_time", DishDetails.prep_time);
        Data.append("extra_food", DishDetails.extra_food);
        Data.append("TotalFat", DishDetails.TotalFat);
        Data.append("Protein", DishDetails.Protein);
        Data.append("TotalCarbohydrate", DishDetails.TotalCarbohydrate);
        Data.append("ingredients", JSON.stringify(fields));
        Data.append("preparation_Instruction", JSON.stringify(Instruction));
      
        if (image.image) {
          Data.append("image", image.image);
        }

        console.log(id,"iiiiiiiiiiiiiiiiiii")
      
        axios.put(`${host}/dishes/update/${id}`, Data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((res) => {
            if (res.data.success) {
              console.log(res.data, 'response');
              setOpen(true);
              setTimeout(async () => {
                await nav('/admin/managedish');
              }, 1000);
            } else {
              console.log("Some error occurred");
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
          Updating Dish Details
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
            value={DishDetails?.meal_type || ""}
            onChange={handleDishDetails}
            InputLabelProps={{shrink:true}}
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
            value={DishDetails?.dietary_type || ""}
            onChange={handleDishDetails}
            InputLabelProps={{shrink:true}}
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
            value={DishDetails.name}
            InputLabelProps={{shrink:true}}
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
            value={DishDetails.extra_food}
            InputLabelProps={{shrink:true}}
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
            value={DishDetails.prep_time}
            InputLabelProps={{shrink:true}}
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
            value={DishDetails.cookTime}
            InputLabelProps={{shrink:true}}
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
              value={DishDetails.Calories}
              InputLabelProps={{shrink:true}}
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
            value={DishDetails.TotalCarbohydrate}
            InputLabelProps={{shrink:true}}
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
            value={DishDetails.Protein}
            InputLabelProps={{shrink:true}}
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
            value={DishDetails.TotalFat}
            InputLabelProps={{shrink:true}}
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
              value={DishDetails.price}
              InputLabelProps={{shrink:true}}
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
            value={DishDetails.description}
            InputLabelProps={{shrink:true}}
            multiline
            rows={2}
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>

        {Details.map((field, index) => (
  <Grid item xs={12} key={index}>
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

{Instruction.map((field, index) => (
  <Grid item xs={12} key={index}>
    <Box sx={{ display: "flex", gap: "10px" }}>
      <TextField
        id="outlined-basic"
        label={`Preparation Instruction ${index + 1}`}
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
            onClick={() => handleSubmit(id)}
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
        Dish Updated!
      </Alert>
    </Snackbar>
  </div>
  )
}

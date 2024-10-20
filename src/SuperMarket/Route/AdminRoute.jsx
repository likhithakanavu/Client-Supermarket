import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from '../component/Nav/Navigation'
import Box from '@mui/material/Box';
import Home from '../component/Pages/Home';
import { styled, useTheme } from '@mui/material/styles';
import '../css/Style.css'
import CssBaseline from '@mui/material/CssBaseline';
import ManageCourse from '../component/Pages/ManageCourse';
import AddCourse from '../component/Pages/AddCourse';
import ViewChapters from '../component/Pages/ViewChapters';
import UpdateCourse from '../component/Pages/UpdateCourse';
import ManageDish from '../component/Pages/Dishes/ManageDish';
import Managecat from '../component/Pages/category/Managecat';
import Addcategory from '../component/Pages/category/Addcategory';
import AddDish from '../component/Pages/Dishes/AddDish';
import UpdateCat from '../component/Pages/category/UpdateCat';
import DishUp from '../component/Pages/Dishes/DishUp';
import ViewUser from '../component/Pages/ViewUser';
import ManageRequest from '../component/Pages/ManageRequest';
import Managepaymet from '../component/Pages/Managepaymet';
import ManageFeed from '../component/Pages/ManageFeed';
import Profile from '../component/Pages/Profile';
import Manageproduct from '../component/Pages/Product/Manageproduct';
import Addproduct from '../component/Pages/Product/Addproduct';
import ProductUp from '../component/Pages/Product/ProductUp';
import ManageOrder from '../component/Pages/manageOrder';
import Order from '../component/Pages/Order';
import Update from '../component/Pages/Update';


export default function SuperMRoute() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
      
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navigation />
                <Box component="main" sx={{ flexGrow: 1, p: 3,background:'#f0f1f6' }}>
                    <DrawerHeader />
                    <Routes>

                        <Route exact path="/" element={<Home />} />      
                        <Route exact path="/managecat" element={<Managecat/>} />
                        <Route exact path="/addcat" element={<Addcategory/>} />
                        <Route exact path="/adddish" element={<AddDish/>} />
                        <Route exact path="/updatecat/:id" element={<UpdateCat/>} />
                        <Route exact path="/dishUp/:id" element={<DishUp/>} />
                        <Route exact path="/view-user" element={<ViewUser/>} />
                        <Route exact path="/mfeed" element={<ManageFeed/>} />
                        <Route exact path="/mproduct" element={<Manageproduct/>} />
                        <Route exact path="/addproduct" element={<Addproduct/>} />
                        <Route exact path="/productUp/:id" element={<ProductUp/>} />
                        <Route exact path="/orders" element={<ManageOrder/>} />
                        <Route exact path="/profileu" element={<Update/>} />

                    </Routes>
                </Box>

            </Box>
        </div>
    )
}

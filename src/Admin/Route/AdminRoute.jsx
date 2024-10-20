import React from 'react'
import Box from '@mui/material/Box';
import { Routes, Route } from 'react-router-dom'
import ClippedDrawer from '../components/ClippedDrawer';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
// import AdminLogin from '../components/AdminLogin';

export default function AdminRoute() {
  return (
    <div>
       
  <Box sx={{ display: 'flex' }}>
            
                <Box component="main" sx={{ flexGrow: 1, p: 3,background:'#f0f1f6' }}>
             
                    
                    <Routes>

                        {/* <Route exact path="/" element={<ClippedDrawer />} /> */}
                        <Route exact path="/" element={<ClippedDrawer/>} />
                        <Route exact path="/adlogin" element={<Login/>} />

                        {/* <Route exact path="/ClippedDrawer" element={<ClippedDrawer />} /> */}
                        {/* <Route exact path="/Add-Catgeory" element={<Manage Category />} />
                        <Route exact path="/view-chapter/:id" element={<ViewChapters />} />
                        <Route exact path="/update-course/:id" element={<UpdateCourse />} />
                         */}

                    </Routes>
                </Box>

            </Box>

    </div>
  )
}

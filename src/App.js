import React from 'react'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import Routing from './Route/Routing'
import AdminRoute from './Admin/Route/AdminRoute'
import SuperMRoute from './SuperMarket/Route/AdminRoute'
import Login from './SuperMarket/component/Pages/Login'
import Reg from './SuperMarket/component/Pages/Reg'
import Profile from './SuperMarket/component/Pages/Profile'
import Thankyou from './pages/Thankyou/Thankyou'
export default function App() {
  return (
    <div>
      <BrowserRouter>

      <Routes>
             
        <Route exact path='/*' element={<Routing/>} />
        <Route exact path='/admin/*' element={<AdminRoute/>} />
        <Route exact path='/superM/*' element={<SuperMRoute/>} />
        
        <Route exact path='/smlogin' element={<Login/>} />
        <Route exact path='/smreg' element={<Reg/>} />
        <Route exact path='/smprofile' element={<Profile/>} />
        <Route exact path='/thankyou' element={<Thankyou/>} />

        </Routes>
        
        </BrowserRouter>
    </div>
  )
}

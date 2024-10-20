import React from 'react'
import {BrouserRoute, Routes , Route} from 'react-router-dom'
import Shop from "../pages/Shop/Shop";
import Journal from "../pages/Journal/Journal";
import Offer from "../pages/Offer/Offer";
import Payment from "../pages/payment/Payment";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import About from "../pages/About/About";
  import SignIn from "../pages/Account/SignIn";
  import SignUp from "../pages/Account/SignUp";
  import Cart from "../pages/Cart/Cart";
  import Contact from "../pages/Contact/Contact";
  import Home from "../pages/Home/Home";
import Status from '../pages/Status/Status';
import Logout from '../pages/Account/Logout';
export default function Routing() {
  return (
    <div>
     
      <Routes>
<Route exact path='/' element={<Home/>} />
<Route path="/shop" element={<Shop/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        {/* <Route path="/journal" element={<Journal />}></Route> */}
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category" element={<Offer />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
        <Route path="/status" element={<Status/>}></Route>

       
    
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/logout" element={<Logout/>}></Route>

      </Routes>
    
    </div>
  )
}

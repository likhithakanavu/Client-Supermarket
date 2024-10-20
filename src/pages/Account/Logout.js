import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  useEffect (()=>{

        alert("Logged out ");
        localStorage.removeItem("UserToken");
        localStorage.removeItem("loggedUser");
        setUserToken(null);
        setTimeout (()=>{
          navigate("/signin");
        },1000);
    })
  return (
    <div>
      
    </div>
  )
}

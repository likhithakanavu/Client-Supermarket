import React, { useState } from 'react';
import './login.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const HandleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = userInfo.email ? "" : "Email is required.";
    tempErrors.password = userInfo.password ? "" : "Password is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const HandleSubmit = async () => {
    if (validate()) {
      try {
        const res = await axios.post('http://localhost:7001/admin/login', userInfo);
        alert(res.data.message);
        if (res.data.success) {
          localStorage.setItem('loggedAdmin', JSON.stringify(res.data.loggedInadmin));
          localStorage.setItem('AdminToken', JSON.stringify(res.data.adminTocken));
          setUserToken(res.data.userToken);
          await navigate('/admin');
        }
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <MDBInput
            wrapperClass='mb-4'
            onChange={HandleChange}
            name='email'
            label='Email address'
            id='emailInput'
            type='email'
            size="lg"
            invalid={!!errors.email}
            feedback={errors.email}
          />
          <MDBInput
            wrapperClass='mb-4'
            onChange={HandleChange}
            name='password'
            label='Password'
            id='passwordInput'
            type='password'
            size="lg"
            invalid={!!errors.password}
            feedback={errors.password}
          />

          <MDBBtn className="mb-4 w-100" onClick={HandleSubmit} size="lg">
            Sign in
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

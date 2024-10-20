import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import '../../css/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [supermToken, setSupermToken] = useState(null);

  const [Superminfo, setSupermInfo] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!Superminfo.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(Superminfo.email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!Superminfo.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (Superminfo.password.length < 4) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const HandleChange = (e) => {
    setSupermInfo({ ...Superminfo, [e.target.name]: e.target.value });
  };

  const HandleSubmit = () => {
    if (validate()) {
      axios
        .post('http://localhost:7001/superM/login', Superminfo)
        .then(async (res) => {
          console.log(res.data)
          alert(res.data.message);
          if (res.data.success) {
            localStorage.setItem(
              'loggedSuperm',
              JSON.stringify(res.data.loggedInUser)
            );
            localStorage.setItem(
              'SupermToken',
              JSON.stringify(res.data.userTocken)
            );
            setSupermToken(res.data.userTocken);
            await navigate('/superM');
          }else if(res.data.successs){

            alert(res.data.message);

          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
  };

  return (
    <MDBContainer fluid className='p-6 background-radial-gradient overflow-hidden'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className='my-5 display-3 fw-bold ls-tight px-3' style={{ color: 'hsl(218, 81%, 95%)' }}>
            Login <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>&nbsp;&nbsp;&nbsp;&nbsp;Super Market</span>
          </h1>
          <figure className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            <figcaption>Super Market Panel - Secure Login</figcaption>
          </figure>
          <figure className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            <figcaption>Don't Have Account?<Link to='/smreg'> SignUp </Link></figcaption>
          </figure>
        </MDBCol>

        <MDBCol md='6' className='position-relative' style={{ marginTop: '80px' }}>
          <div id='radius-shape-1' className='position-absolute rounded-circle shadow-5-strong'></div>
          <div id='radius-shape-2' className='position-absolute shadow-5-strong'></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBInput
                wrapperClass='mb-4'
                label='Email'
                onChange={HandleChange}
                name='email'
                id='form3'
                type='email'
                value={Superminfo.email}
                className={errors.email && 'is-invalid'}
              />
              {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                onChange={HandleChange}
                name='password'
                id='form4'
                type='password'
                value={Superminfo.password}
                className={errors.password && 'is-invalid'}
              />
              {errors.password && <div className='invalid-feedback'>{errors.password}</div>}

              <MDBBtn className='w-100 mb-4' onClick={HandleSubmit} size='md'>
                Sign in
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import '../../css/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Reg() {
  const navigate = useNavigate();

  const [Superminfo, setSupermInfo] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const HandleChange = (e) => {
    setSupermInfo({ ...Superminfo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};

    // Name validation
    tempErrors.name = Superminfo.name ? '' : 'Name is required.';

    // Email validation
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    tempErrors.email = emailRegex.test(Superminfo.email) ? '' : 'Email must end with @gmail.com.';

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    tempErrors.password = passwordRegex.test(Superminfo.password) ? '' : 
      'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.';

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    tempErrors.phone = phoneRegex.test(Superminfo.phone) ? '' : 'Contact Number must be exactly 10 digits.';

    // Address validation
    tempErrors.address = Superminfo.address ? '' : 'Address is required.';

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const HandleSubmit = () => {
    if (validate()) {
      axios
        .post('http://localhost:7001/superM/reg', Superminfo)
        .then(async (res) => {
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
            await navigate("/smlogin");
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
            Registration <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>&nbsp;&nbsp;&nbsp;&nbsp;SuperM</span>
          </h1>
          <figure className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            <figcaption>SuperM Panel - Secure Registration</figcaption>
          </figure>
        </MDBCol>

        <MDBCol md='6' className='position-relative' style={{ marginTop: '80px' }}>
          <div id='radius-shape-1' className='position-absolute rounded-circle shadow-5-strong'></div>
          <div id='radius-shape-2' className='position-absolute shadow-5-strong'></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBInput
                wrapperClass='mb-4'
                label='Name'
                onChange={HandleChange}
                name='name'
                id='form3'
                type='text'
                value={Superminfo.name}
                className={errors.name ? 'is-invalid' : ''}
              />
              {errors.name && <div className='invalid-feedback'>{errors.name}</div>}

              <MDBInput
                wrapperClass='mb-4'
                label='Email'
                onChange={HandleChange}
                name='email'
                id='form3'
                type='email'
                value={Superminfo.email}
                className={errors.email ? 'is-invalid' : ''}
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
                className={errors.password ? 'is-invalid' : ''}
              />
              {errors.password && <div className='invalid-feedback'>{errors.password}</div>}

              <MDBInput
                wrapperClass='mb-4'
                label='Contact Number'
                onChange={HandleChange}
                name='phone'
                id='form3'
                type='tel'
                value={Superminfo.phone}
                className={errors.phone ? 'is-invalid' : ''}
              />
              {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}

              <MDBInput
                wrapperClass='mb-4'
                label='Address'
                onChange={HandleChange}
                name='address'
                id='form3'
                type='text'
                value={Superminfo.address}
                className={errors.address ? 'is-invalid' : ''}
              />
              {errors.address && <div className='invalid-feedback'>{errors.address}</div>}

              <MDBBtn className='w-100 mb-4' onClick={HandleSubmit} size='md'>
                Sign up
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

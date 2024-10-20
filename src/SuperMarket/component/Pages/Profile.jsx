import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBIcon, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Profile() {
  const host = "http://127.0.0.1:7001";
  const [Superm, setSuperm] = useState();

  useEffect(() => {
    let tokenuser = JSON.parse(localStorage.getItem('loggedSuperm'));
   
const id = tokenuser._id;
console.log(id,"fffffffffffff")

 axios.get(`${host}/SuperM/singleview/${id}`)
      .then((res) => {
        setSuperm(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  console.log(Superm,"fffffffffffff")

  return (
    <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                {/* Back Arrow Button */}
                <div className="d-flex justify-content-start">
                  <Link to="/superM">
                    <MDBIcon icon="arrow-left" size="2x" />
                  </Link>
                </div>

                <div className="mt-3 mb-4">
                  <MDBIcon icon="user-circle" size="4x" className="rounded-circle" fluid />
                </div>
                <MDBTypography tag="h4">{Superm?.name}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  @Admin <span className="mx-2">|</span> <a href="#!">Managing Director</a>
                </MDBCardText>
                <div className="mb-4 pb-2">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="facebook" size="lg" />
                    </MDBBtn>
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <MDBBtn outline floating className="mx-1">
                      <MDBIcon fab icon="twitter" size="lg" />
                    </MDBBtn>
                  </a>
                  <a href="https://www.skype.com" target="_blank" rel="noopener noreferrer">
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="skype" size="lg" />
                    </MDBBtn>
                  </a>
                </div>
              <Link to="/superM/profileu"> <MDBBtn rounded size="lg">
                  Update  
                </MDBBtn></Link>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">{Superm?.phone}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Contact Number</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{Superm?.email}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Email</MDBCardText>
                  </div>
                </div>
                <MDBCardText className="mb-1 h5">{Superm?.address}</MDBCardText>
                <MDBCardText className="small text-muted mb-0">Address</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

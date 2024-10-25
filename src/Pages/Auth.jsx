import React, { useEffect, useState } from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBNavbarBrand
}
  from 'mdb-react-ui-kit';
import logo from '../Assets/images/gamepad.png'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/allAPI';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchAllGames from '../Hooks/FetchAllGames';
import { base_Url } from '../Services/base_Url';
import Animation from '../Components/User/Animation';
function Auth({ register }) {
  Animation()
  const isRegisterFrom = register ? true : false
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const location = useNavigate();
  const allGames = useFetchAllGames()
  //register function
  const registerData = async () => {
    const { username, email, password } = userData
    if (!username || !email || !password) {
      toast.warning("Please Fill Details", {
        closeButton: <Button variant="outline-light">OK</Button>,
      })
    }
    else {
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status == 200) {
        toast.success("Register successfull", {
          // Adding an "OK" button to the toast
          closeButton: <Button variant="outline-light">OK</Button>,
          // Handle the action when the button is clicked
          onClose: () => {
            location('/login');
          }
        });
      }
      else {
        toast.warning(result.response.data, {
          closeButton: <Button variant="outline-light">OK</Button>,
        })
      }
    }
    console.log(userData);
  }
  //login function
  const loginData = async () => {
    const { email, password } = userData;
    if (!email || !password) {
      toast.warning("Please Enter Details", {
        closeButton: <Button variant="outline-light">OK</Button>,
      });
    } else {
      const result = await loginAPI(userData);
      console.log(result);
      if (result.status === 200) {
        const user = result.data.user;
        sessionStorage.setItem("existingUser", JSON.stringify(user));
        sessionStorage.setItem("token", result.data.token);

        if (user.email === "admin@gmail.com" && user.password === "admin@123") {
          // Navigate to the admin page
          window.location.href = '/games';
        } else {
          // Regular user login, handle accordingly
          const set = toast.success("Login successful", {
            closeButton: <Button variant="outline-light">OK</Button>,
            onClose: () => {
              window.location.href = '/';
            }
          });
        }
      } else {
        toast.error(result.response.data, {
          closeButton: <Button variant="outline-light">OK</Button>,
        });
      }
    }
  };


  useEffect(() => {
    document.getElementById('formControlLg').value = '';
  }, []);
  return (
    <div className="auth" >
      <MDBContainer fluid>
        <MDBRow>

          <MDBCol className='bg-black px-5' sm='6'>
            <div className='d-flex flex-row ps-5 pt-5'>
              <MDBNavbarBrand href='/' style={{ color: '#e6e6ea' }} ><img
                src={logo}
                height='50'
                alt=''
                className='me-3'
                loading='lazy'
              />    <span className="h1 fw-bold mb-0 py-5">Game Paradise</span></MDBNavbarBrand>
            </div>

            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

              <h3 className="fw-bold mb-3 ps-5 pb-3" style={{ letterSpacing: '3px', color: '#FBFEF9' }}>
                {
                  isRegisterFrom ? 'Register Here' : 'Login Here'
                }
              </h3>
              <form action="" autoComplete="off">
                {
                  isRegisterFrom &&
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' autoComplete="off" labelClass='white-label-class' value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} label='Name' id='formControlLg' type='name' size="lg" />
                }
                <MDBInput wrapperClass='mb-4 mx-5 w-100' autoComplete="off" labelClass='white-label-class' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} label='Email address' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='white-label-class' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} label='Password' id='formControlLg' type='password' size="lg" autoComplete="off" />
                <div>
                  {
                    isRegisterFrom ?
                      <div>
                        <button class="glow-on-hover mx-5 my-3" type="button" onClick={registerData}>Register</button>
                        <p className='ms-5'>Have an account?
                          <Link to={'/login'} style={{ textDecoration: 'none' }}>
                            <a class="link-info">Login here</a>
                          </Link></p>

                      </div>
                      :
                      <div>

                        <button class="glow-on-hover mx-5 my-3" type="button" onClick={loginData}>Login</button>
                        <Link to={'/register'} style={{ textDecoration: 'none' }}
                        >
                          <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>
                        </Link>
                      </div>
                  }
                </div>
                <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted text-white" href="#!">Forgot password?</a></p>
              </form>
            </div>

          </MDBCol>

          <MDBCol sm='6' className='d-none d-sm-block px-0' >
            <MDBCarousel className='carousel' >
               <MDBCarouselItem itemId={1} interval={3000}>
                  <div className="carousel-item-content" style={{ background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))' }}>
                    <img src={allGames ? `${base_Url}/uploads/${allGames[0]?.image}` : "null"} className='d-block w-100' alt='...' height={'730px'} style={{ objectFit: 'cover' }} />
                    <div className="form-overlay">
                      <div className="form-overlay-content" data-aos="fade-left" data-aos-once='true'>
                        <img src={allGames[0]?.logoImage}  className='auth-logo-image mx-xl-5 mx-sm-0' height={'300px'} width={'350px'} alt="" />
                        <p className='text-white text-justify px-5'>{allGames[0]?.description}</p>
                        <div className='button mx-5'>
                          <Button variant="outline-light" className='mx-3'  >Buy Now</Button>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </MDBCarouselItem>
             <MDBCarouselItem itemId={2} interval={3000}>
              <div className="carousel-item-content" style={{ background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))' }}>
                  <img src={allGames ? `${base_Url}/uploads/${allGames[1]?.image}` : "null"} className='d-block w-100' alt='...' height={'730px'} style={{ objectFit: 'cover' }} />
                  <div className="form-overlay">
                    <div className="form-overlay-content mt-5" data-aos="fade-left" data-aos-once='true'>
                      <img src={allGames[1]?.logoImage}  className='logo-image mx-xl-5 my-3 mx-sm-0' height={'130px'} width={'500px'} alt="" />
                      <p className='text-white text-justify px-5'>{allGames[1]?.description}</p>
                      <div className='button mx-5'>
                        <Button variant="outline-light" className='mx-3'  >Buy Now</Button>{' '}
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCarouselItem>
              <MDBCarouselItem itemId={3} interval={3000}>
              <div className="carousel-item-content" style={{ background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))' }}>
                  <img src={allGames ? `${base_Url}/uploads/${allGames[2]?.image}` : "null"} className='d-block w-100' alt='...' height={'730px'} style={{ objectFit: 'cover' }} />
                  <div className="form-overlay">
                    <div className="form-overlay-content mt-5" data-aos="fade-left" data-aos-once='true'>
                      <img src={allGames[2]?.logoImage}  className='logo-image mx-xl-5 my-5 mx-sm-0' height={'100px'} width={'450px'} alt="" />
                      <p className='text-white text-justify px-5'>{allGames[2]?.description}</p>
                      <div className='button mx-5'>
                        <Button variant="outline-light" className='mx-3'  >Buy Now</Button>{' '}
                      </div>
                    </div>
                  </div>
                  </div>
              </MDBCarouselItem>
            </MDBCarousel>
          </MDBCol>

        </MDBRow>

      </MDBContainer>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Auth;
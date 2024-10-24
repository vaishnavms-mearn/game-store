import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon,
    MDBBtn,
} from 'mdb-react-ui-kit';
import img from '../../Assets/images/gamepad.png'
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import updateUser from './updateUser';
import { getUsersAPI } from '../../Services/allAPI';
export default function Header() {
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [userid, setUserId] = useState("")
    const [openNav, setOpenNav] = useState(false);
    const [purchasedGamesCount, setPurchasedGamesCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [user, setUser] = useState(null);
    const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
    const location = useNavigate();
    const handleLogout = () => {
        // Handle logout logic, e.g., clear session storage
        sessionStorage.removeItem('existingUser');
        location('/login')
    };
    useEffect(() => {
        // Fetch user details and purchased games when the page is loaded
        const fetchUserData = async () => {
            try {
                const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
                if (existingUser) {
                    setEmail(existingUser.email);
                    setUserId(existingUser._id);
                    const usersid = existingUser._id
                    console.log(userid);
                    const reqHeaders = { "Authorization": `Bearer ${token}` };
                    const user = await getUsersAPI(usersid, reqHeaders);
                    setUser(user);
                    setPurchasedGamesCount(user?.data?.purchasedGames?.length || 0);
                    setWishlistCount(user?.data?.wishlist?.length || 0);
                }
            } catch (error) {
                console.log(error.message);
            }
        };


        fetchUserData()

        window.scrollTo(0, 0);
    }, []);
    console.log(user?.data?.wishlist?.length);
    return (
        <MDBNavbar expand='lg' style={{ backgroundColor: '#101014', padding: '20px' }}>
            <MDBContainer fluid >
                <MDBNavbarBrand href='/' className='mx-xl-5 mx-md-0  nav-main' style={{ color: '#e6e6ea' }} ><img
                    src={img}
                    height='50'
                    alt=''
                    className='mx-xl-3 mx-md-0'
                    loading='lazy'
                /><h2 className='mt-2'>Game Paradise</h2></MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenNav(!openNav)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar open={openNav}>
                    <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0 me-5'>
                        <MDBNavbarItem >
                            <MDBNavbarLink href='/categories' style={{ color: '#e6e6ea' }} className='mx-2' active aria-current='page' >
                                Categories
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem >
                            <MDBNavbarLink href='/library' className='mx-2' style={{ color: '#e6e6ea' }}>My Library<Badge className='mx-2 px-2' bg='secondary'></Badge></MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem >
                            <MDBNavbarLink href='/wishlist' className='mx-2' style={{ color: '#e6e6ea' }}>Wishlist<Badge className='mx-2 px-2'  bg="secondary"></Badge></MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0 me-5' >
                        <MDBNavbarItem >
                            <MDBBtn color='link' rounded size='sm'>
                                <updateUser user={user} />
                            </MDBBtn>
                        </MDBNavbarItem>
                        <MDBNavbarItem className='mx-2' onClick={handleLogout}>
                            {existingUser ? (
                                <Button variant="outline-light" className="mx-3 w-100 btn-lg my-2" >
                                    <i className="fa-solid fa-user fa-fade px-1"></i>   Logout
                                </Button>
                            ) : (
                                <Link to='/login'>
                                    <Button variant="outline-light" className="mx-3 w-100 btn-lg my-2" >
                                        <i className="fa-solid fa-user fa-fade px-1"></i>    Login
                                    </Button>
                                </Link>
                            )}
                        </MDBNavbarItem>

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
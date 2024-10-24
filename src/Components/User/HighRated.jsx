import React, { useEffect, useState } from 'react'
import { base_Url } from '../../Services/base_Url';
import { Button, Card, Col, Row } from 'react-bootstrap';
import useFetchAllGames from '../../Hooks/FetchAllGames';
import Animation from '../User/Animation';
import { getAllGamesAPI, wishlistGamesAPI, deleteFromWishlistAPI } from '../../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom';
function HighRated() {
    Animation()
    const allGames = useFetchAllGames();
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [userid, setUserId] = useState('');
    const [wishlistStatus, setWishlistStatus] = useState({});

    useEffect(() => {
        const existingUser = JSON.parse(sessionStorage.getItem('existingUser'));
        if (existingUser) {
            setEmail(existingUser.email);
            setUserId(existingUser._id);
            if (sessionStorage.getItem('token')) {
                setToken(sessionStorage.getItem('token'));
            }
        }
    }, []);


    const wishlist = async (gameId) => {
        if (token) {
            try {
                const reqBody = {
                    userId: userid,
                    gameId: gameId
                };
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                };
                const response = await wishlistGamesAPI(gameId, reqBody, reqHeader);
                if (response.status === 200) {
                    toast.success('Added to wishlist');
                } else {
                    toast.error('Already in wishlist');
                }
            } catch (error) {
                console.log('Error adding to wishlist:', error);
                toast.error('Failed to add to wishlist');
            }
        }
        else{
            toast.error("Please Login", {
                closeButton: <Button variant="outline-light">OK</Button>,
              })
        }
    };return (
        <div className='free container py-3'  data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        data-aos-once='true'>
            <Link to={'/categories'}>
                <h5 className='ps-5 ms-4 text-white'>High Rated Games <i className="fa-solid fa-arrow-right fa-xs mx-1 pt-3"></i></h5>
            </Link>
            <Row className=' py-3'>
                {allGames.length > 0 ? (
                    allGames.filter(item => item.rating > '4').slice(0, 3).map((item, index) => (
                        <Col lg={6} xl={4} sm={12} className='px-4'>
                            <Link to={`game/${item._id}`}>
                                <img classname='card-image' variant="top" src={item ? `${base_Url}/uploads/${item.image}` : "null"} alt="" height={'300px'} width={'400px'} style={{ borderRadius: '20px' }} />
                            </Link>
                            <h6 className='pt-3 pb-2 text-white category'>{item.category}</h6>
                            <h5 className=' text-white'>{item.title}</h5>
                            <h5 className=' text-white'>{item.rating} <i class="fa-solid fa-star"></i></h5>
                            <div className="d-flex justify-content-between">
                                    <i className={`fa-regular fa-heart ${wishlistStatus[item._id] ? 'text-danger' : 'text-light'}`} onClick={() => wishlist(item._id)}></i>
                                    <Card.Subtitle className="mt-2 text-white">${item.price}</Card.Subtitle>
                                </div>
                        </Col>
                    ))) : (
                    <div className="text-center">no Games found</div>
                )
                }
            </Row>
        </div>
    )
}

export default HighRated
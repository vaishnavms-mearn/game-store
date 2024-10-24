import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getGamesByIdAPI, getUsersAPI, purchasedGamesAPI } from '../../Services/allAPI';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { base_Url } from '../../Services/base_Url';
import { ToastContainer, toast } from 'react-toastify';
import useFetchAllGames from '../../Hooks/FetchAllGames';
function Game() {
    const [allGames, setAllGames] = useState({});
    const relatedGames = useFetchAllGames();
    const [buttonState, setButtonState] = useState('enabled');
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [userid, setUserId] = useState("")
    const [gamePurchased, setGamePurchased] = useState(false);
    console.log(email);
    //get token from session storage
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])
    useEffect(() => {

        if (sessionStorage.getItem("existingUser")) {
            const existingUser = sessionStorage.getItem("existingUser")
            const userData = JSON.parse(existingUser)
            setEmail(userData.email)
            setUserId(userData._id)
        }
    }, [])
    const { id } = useParams();
    const checkout = async () => {
        if (token) {
            try {
                const res = await fetch(`${base_Url}/checkout`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        items: [
                            {
                                title: allGames.title,
                                price: allGames.price,
                                productId: allGames._id,
                            },
                        ],
                        email: email
                    })
                });
                const data = await res.json();
                window.location = data.url

                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                const reqBody = {
                    userId: userid,
                    gameId: id
                }
                const purchasedGames = await purchasedGamesAPI(reqBody, reqHeader)
                if (purchasedGames.status == 200) {
                    console.log(purchasedGames.data);
                } else {
                    console.log(purchasedGames.response.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            toast("Please log in to proceed with the purchase.");
        }
    };
    const install = async () => {
        toast.success("Installing", {
            closeButton: <Button variant="outline-light">OK</Button>,
            onClose: () => {
                setButtonState('installed');
            }
        })
    }
    useEffect(() => {
        // Fetch user details and purchased games when the page is loaded
        const fetchUserData = async () => {
            try {
                const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
                if (existingUser) {
                    setEmail(existingUser.email);
                    setUserId(existingUser._id);

                    // Fetch user's purchased games
                    const usersid = existingUser._id
                    console.log(userid);
                    const reqHeaders = { "Authorization": `Bearer ${token}` };
                    const user = await getUsersAPI(usersid, reqHeaders);
                    console.log(user);

                    if (user.data && user.data.purchasedGames.includes(id)) {
                        setGamePurchased(true);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        // Fetch game details by ID
        const fetchData = async () => {
            try {
                const result = await getGamesByIdAPI(id, { 'Content-Type': 'multipart/form-data' });
                if (result.status === 200) {
                    setAllGames(result.data);
                } else {
                    alert('Failed to retrieve project');
                }
            } catch (err) {
                console.log('Error Fetching projects', err);
                alert('Failed to retrieve projects');
            }
        };

        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"));
        }

        fetchUserData();
        fetchData();
        window.scrollTo(0, 0);
    }, [id, token]);

    return (
        <div style={{ backgroundColor: '#121212' }}>
            <Header />
            <Container>
                <Row className="my-5">
                    <Col lg={8}>
                        <h1 className="text-white py-3 description-title">{allGames.title}</h1>
                        <p className="text-white mx-3 fs-4">
                            {allGames.rating}
                            <i className="fa-solid fa-star px-1"></i>
                        </p>
                        <div className="responsive-iframe-container">
                            <iframe
                                src={`https://www.youtube.com/embed/${allGames.link}&autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <p className="text-white my-4">{allGames.description}</p>
                    </Col>
                    <Col lg={4} style={{ marginTop: '200px' }}>
                        <img
                            src={allGames.logoImage}
                            alt=""
                            height={'150px'}
                            width={'350px'}
                            className="my-3 mx-5"
                            style={{ borderRadius: '15px' }}
                        />
                        <h3 className="text-white mx-3 game-description my-3">{allGames.category}</h3>
                        <h4 className="text-white mx-3 game-price">${allGames.price}</h4>
                        {!gamePurchased ? (
                            <Button variant="outline-light" className="mx-3 w-100 btn-lg my-2" onClick={checkout}>
                                Pay
                            </Button>
                        ) : (
                            <Button
                                variant="outline-light"
                                className="mx-3 w-100 btn-lg my-2"
                                disabled={buttonState === 'disabled' || buttonState === 'installed'} // Disable the button if it's disabled or installed
                                onClick={buttonState !== 'installed' ? install : undefined} // Only allow install if button is not installed
                            >
                                {buttonState === 'installed' ? 'Installed' : 'Install'}
                            </Button>
                        )}
                        <Button variant="outline-light" className="mx-3 w-100 btn-lg my-2" href='/library'>
                            Library
                        </Button>{' '}
                        <Button variant="outline-light" className="mx-3 w-100 btn-lg my-2" href='/wishlist'>
                            Wishlist
                        </Button>{' '}
                    </Col>
                </Row>
            </Container>
            <div className='discounts container ps-5 py-3'>
            <Link to={'/categories'}>
                <h5 className='ps-4 text-white'>More Games <i className="fa-solid fa-arrow-right fa-xs mx-1 pt-3"></i></h5>
            </Link>
            <div className="row" data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500">
                {relatedGames.length > 0 ? (
                        relatedGames.filter(item => item.category === allGames.category).slice(0, 4).map((item, index) => (
                        < Col xl={3} lg={4} sm={6} xs={12} >
                            <Card key={index} className='' style={{ width: '18rem', backgroundColor: 'transparent', color: 'white' }}>
                                <Card.Body>
                                    <Link to={`game/${item._id}`}>
                                        <Card.Img className='card-image' variant="top" src={item ? `${base_Url}/uploads/${item.image}` : "null"} alt="" height={'300px'} width={'300px'} />
                                    </Link>
                                    <Card.Title className='text-white py-2'>{item.title}</Card.Title>
                                    <div className="d-flex justify-content-between my-2">
                                        <Card.Subtitle className="text-white category"><p>{item.category}</p></Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-white">{item.rating} <i className="fa-solid fa-star"></i></Card.Subtitle>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))) : (
                    <div className="text-center">no Games found</div>
                )}
            </div>
            </div>
            <Footer />

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

export default Game;

import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { deletePurchasedGamesAPI, deletewishlistGamesAPI, getAllGamesAPI } from '../Services/allAPI';
import { base_Url } from '../Services/base_Url';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import Header from '../Components/User/Header';
import Footer from '../Components/User/Footer';
import { getGamesByIdAPI, getUsersAPI, purchasedGamesAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Col } from 'react-bootstrap';
function Wishlist() {
    const [token, setToken] = useState("")
    const [email, setEmail] = useState("")
    const [userid, setUserId] = useState("")
    const [purchasedGames, setPurchasedGames] = useState([]);
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])
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
                    console.log(user);

                    if (user.data) {
                        setPurchasedGames(user.data.wishlist);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };


        fetchUserData()

        window.scrollTo(0, 0);
    }, []);
    console.log(purchasedGames);
    const [allGames, setallGames] = useState([])
    //api call
    const allGame = async () => {

        var reqHeader = {
            "Content-Type": "multipart/form-data",
        }

        try {
            console.log(reqHeader);
            const result = await getAllGamesAPI(reqHeader)
            console.log(result);
            if (result.status === 200) {
                setallGames(result.data)
                console.log(allGames);
            }
            else {
                alert("failed to retrieve project")
            }
        }
        catch (err) {
            console.log('Error Fetching projets', err);
            alert('failed to retrieve projects')
        }
    }

    useEffect(() => {
        allGame()
    }, [])
    const deleteGamesFromUser = async (gameId) => {
        if (token) {
            toast.warning("Are you sure to delete the game?", {
                closeButton: (
                    <>
                        <Button variant="outline-light btn-sm" onClick={async () => {
                            try {
                                const reqBody = {
                                    userId: userid,
                                    gameId: gameId
                                };
                                const reqHeader = {
                                    "Authorization": `Bearer ${token}`
                                }
                                const result = await deletewishlistGamesAPI(gameId,reqBody, reqHeader);

                                if (result.status === 200) {
                                    setPurchasedGames(prevWishlistGames => prevWishlistGames.filter(id => id !== gameId));
                                    toast.success("deleted drom wishlist");
                                } else {
                                    toast.error("Failed to delete game");
                                }
                            } catch (error) {
                                console.log('Error deleting game', error);
                                toast.error('Failed to delete game');
                            }
                        }}>Delete</Button>
                        <Button variant="outline-light" onClick={() => {}}>No</Button>
                    </>
                )
            });
        }
    };
    return (
        <div className="my-library" style={{ backgroundColor: '#121212' }} >
            <Header/>
        <div className='library container ps-5 py-3'>
            <Link to={'/categories'}>
                <h5 className='ps-4 text-white'>Wishlist <i className="fa-solid fa-arrow-right fa-xs mx-1 pt-3"></i></h5>
            </Link>
            <div className="row">
                    {purchasedGames.length > 0 ? (
                        purchasedGames.map((gameId) => {
                            const game = allGames.find((item) => item._id === gameId);
                            if (game) {
                                return (
                                    <Col xl={3} lg={4} md={6} sm={12} >
                                    <Card key={game._id} className='me-4' style={{ width: '20rem', backgroundColor: 'transparent', color: 'white' }}>
                                        <Card.Body>
                                            <Link to={`../game/${game._id}`}>
                                                <Card.Img variant="top" src={game ? `${base_Url}/uploads/${game.image}` : "null"} alt="" height={'300px'} width={'300px'} />
                                            </Link>
                                            <Card.Title className='text-white py-2'>{game.title}</Card.Title>
                                            <div className="d-flex justify-content-between my-2">
                                                <Card.Subtitle className="text-white category"><p>{game.category}</p></Card.Subtitle>
                                                <MDBBtn color='link' rounded size='sm' onClick={() => deleteGamesFromUser(game._id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </MDBBtn>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    </Col>
                                );
                            } else {
                                return null;
                            }
                        })
                    ) : (
                        <div className="text-center my-5 mx-5"><h1 className='fw-bolder'>No purchased games found</h1></div>
                    )}
                </div>
        </div>
        <Footer/>
        <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>

    )
}

export default Wishlist
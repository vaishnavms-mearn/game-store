import React, { useEffect, useState } from 'react'
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { getAllGamesAPI } from '../../Services/allAPI';
import { base_Url } from '../../Services/base_Url';
import { Button } from 'react-bootstrap';
import Animation from './Animation';
import { Link } from 'react-router-dom';
function Banner() {

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
                console.log();
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
    Animation()
    useEffect(() => {
        allGame()
    }, [])

    return (

        <div className='carousel container pb-5 pt-3'>

            <MDBCarousel interval={3000} style={{ border: 'none', borderRadius: '20px' }} >
                <MDBCarouselItem itemId={1} interval={3000} style={{ border: 'none', borderRadius: '20px' }}>
                    <div className="carousel-item-content" >
                        <Link to={`game/${allGames[3]?._id}`}>
                            <img src={allGames ? `${base_Url}/uploads/${allGames[3]?.image}` : "null"} className='d-block' alt='...' style={{ borderRadius: '20px' }} height={'550px'} width={'1300px'} />
                        </Link>
                        <div className="banner-overlay">
                            <div className="banner-overlay-content" data-aos="fade-down" data-aos-once='true'>
                                <img src={allGames[3]?.logoImage} className='logo-image mb-5 mx-sm-0 mx-xl-3 px-sm-0' height={'100px'} width={'400px'} alt="" />
                                <div className='button mx-5'>
                                    <Button variant="outline-light" className='mx-3 mx-sm-0'  >Buy Now</Button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </MDBCarouselItem>

                <MDBCarouselItem itemId={2} interval={3000} style={{ border: 'none', borderRadius: '20px' }}>
                    <div className="carousel-item-content" >
                        <Link to={`game/${allGames[4]?._id}`}>
                            <img src={allGames ? `${base_Url}/uploads/${allGames[4]?.image}` : "null"} className='d-block' alt='...' style={{ borderRadius: '20px' }} height={'550px'} width={'1300px'} />
                        </Link>
                        <div className="banner-overlay">
                            <div className="banner-overlay-content" data-aos="fade-left" data-aos-once='true'>
                                <img src={allGames[4]?.logoImage} className='logo-image mx-xl-5  mx-sm-0' height={'200px'} width={'300px'} alt="" />
                                <div className='button mx-5'>
                                    <Button variant="outline-light" className='mx-xl-5 mt-4 mx-sm-0'  >Buy Now</Button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={3} interval={3000} style={{ border: 'none', borderRadius: '20px' }}>
                    <div className="carousel-item-content" >
                        <Link to={`game/${allGames[5]?._id}`}>
                            <img src={allGames ? `${base_Url}/uploads/${allGames[5]?.image}` : "null"} className='d-block' alt='...' style={{ borderRadius: '20px' }} height={'550px'} width={'1300px'} />
                        </Link>
                        <div className="banner-overlay">
                            <div className="banner-overlay-content" data-aos="fade-left" data-aos-once='true'>
                                <img src={allGames[5]?.logoImage} className='logo-image mx-xl-5  mx-sm-0' height={'150px'} width={'400px'} alt="" />
                                <div className='button mx-xl-5 mx-sm-0 my-0'>
                                    <Button variant="outline-light" className='mx-xl-5 mt-4 mx-sm-0 '  >Buy Now</Button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </MDBCarouselItem>
            </MDBCarousel>
        </div>
    )
}

export default Banner
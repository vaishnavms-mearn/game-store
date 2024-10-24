import React, { useEffect, useState } from 'react';
import Header from '../Components/User/Header';
import Footer from '../Components/User/Footer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { getAllGamesAPI } from '../Services/allAPI';
import { base_Url } from '../Services/base_Url';
import filterListData from '../Assets/js/filterListData';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Categories() {
    const [filters, setFilters] = useState(filterListData);
    const [allGames, setAllGames] = useState({});
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchKey, setSearchKey] = useState("")
    console.log(searchKey);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const reqHeader = { "Content-Type": "multipart/form-data" };
                const result = await getAllGamesAPI(searchKey,reqHeader);
                if (result.status === 200) {
                    setAllGames(result.data);
                    setFilteredGames(result.data); // Initially display all games
                } else {
                    alert("Failed to retrieve games");
                }
            } catch (err) {
                console.log('Error Fetching games', err);
                alert('Failed to retrieve games');
            }
        };

        fetchGames();
    }, [searchKey]);

    const handleFilterGames = category => {
        if (category === 'All') {
            setFilteredGames(allGames); // Display all games
        } else {
            const filtered = allGames?.filter(item => item.category === category);
            setFilteredGames(filtered);
        }

        // Update filter state to mark the active category
        setFilters(prevFilters =>
            prevFilters.map(filter => ({
                ...filter,
                active: filter.name === category,
            }))
        );
    };

    return (
        <div>
            <Header />
            <div className="categories w-100" style={{ backgroundColor: '#121212' }}>
                <div className="container row">
                    <div className="col-lg-8">
                        <ul className='filters'>
                            {filters.map(filter => (
                                <li
                                    key={filter._id}
                                    className={`${filter.active ? 'actives' : undefined}`}
                                    onClick={() => handleFilterGames(filter.name)}
                                >
                                    {filter.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-flex justify-content-center  my-4">
                            <div className='d-flex mb-5 border border-4 rounded bg-white'>
                                <input type="text" className='form-control' onChange={e => setSearchKey(e.target.value)} placeholder='Search' />
                                <i class="fa-solid fa-magnifying-glass fs-3 p-2"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Row>
                        {filteredGames.length > 0 ? (
                            filteredGames.map((item, index) => (
                                <Col xl={4} lg={6} className=''>
                                    <Card key={index} className='px-3' style={{ width: '25rem', backgroundColor: 'transparent', color: 'white' }}>
                                        <Card.Body>
                                            <Link to={`../game/${item._id}`}>
                                                <Card.Img variant="top" src={item ? `${base_Url}/uploads/${item.image}` : "null"} alt="" height={'370px'} />
                                            </Link>
                                            <Card.Title className='text-white py-2'>{item.title}</Card.Title>
                                            <div className="d-flex justify-content-between my-2">
                                                <Card.Subtitle className="text-white category"><p>{item.category}</p></Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-white">{item.rating} <i class="fa-solid fa-star"></i></Card.Subtitle>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <Button variant="outline-light" className='btn-sm' >Buy Now</Button>{' '}
                                                <Card.Subtitle className="mt-2 text-white">{item.price}</Card.Subtitle>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <div className="text-center">No Games found</div>
                        )}
                    </Row>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Categories;

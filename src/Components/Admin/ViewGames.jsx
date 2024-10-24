import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRipple,
} from "mdb-react-ui-kit";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { base_Url } from '../../Services/base_Url';
import { Container } from 'react-bootstrap';
function ViewGames({ game }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(game);
    return (
        <div>

            <MDBBtn color='link' rounded size='sm' onClick={handleShow}>
                <i className='fa-solid fa-eye'></i>
            </MDBBtn>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='xl'
            >

                <Modal.Header closeButton>
                    <Modal.Title>Edit Games</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <MDBRipple
                        rippleColor="light"
                        rippleTag="div"
                        className="bg-image hover-overlay"
                    >
                        <a>
                            <div
                                className="mask"
                                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                            ></div>
                        </a>
                    </MDBRipple>

                    {
                        <Container>
                            <MDBListGroup className="shadow" style={{ minWidth: '22rem' }} light>
                                <MDBListGroupItem className='bg-light text-primary px-3 '>
                                    Game Title : {game.title}
                                </MDBListGroupItem>
                                <MDBListGroupItem noBorders active aria-current='true' className='bg-light text-primary px-3  text-justify'>
                                    Game Description : {game.description}
                                </MDBListGroupItem>
                                <MDBListGroupItem noBorders className='bg-light text-primary px-3 '>
                                    Game Price : {game.price}
                                </MDBListGroupItem>
                                <MDBListGroupItem noBorders className='bg-light text-primary px-3 '>
                                    Game Image :     <img src={game ? `${base_Url}/uploads/${game.image}` : "null"} alt="" height={'200px'} width={'300px'} />
                                </MDBListGroupItem>
                                <MDBListGroupItem noBorders className='bg-light text-primary px-3 '>
                                    Game Rating : {game.rating}
                                </MDBListGroupItem>
                            </MDBListGroup>
                        </Container>

                    }

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default ViewGames
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    MDBBtn,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { addGameResponseContext, editGameResponseContext } from '../../ContextApi/ContextShare';
import { base_Url } from '../../Services/base_Url';
import { editGamesAPI } from '../../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import filterListData from '../../Assets/js/filterListData';
function updateUser({ user }) {
    const { editGameRes, setEditGameRes } = useContext(editGameResponseContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(game);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleSidebarCollapse = (collapsed) => {
        setSidebarCollapsed(collapsed);
    }
    console.log(game);
    //to hold project details
    const [gameDetails, setgameDetails] = useState({
        id: game._id, title: game.title, description: game.description, rating: game.rating, price: game.price, category: game.category, logoImage: game.logoImage, image: "", link: game.link,
    })
    console.log(gameDetails);
    //to hold image url
    const [preview, setPreview] = useState("")
    console.log(preview);
    useEffect(() => {
        if (gameDetails.image) {
            setPreview(URL.createObjectURL(gameDetails.image))
        }
    }, [gameDetails.image])
    const gameEdit = async () => {

        const {
            id,
            title,
            description,
            rating,
            price,
            category,
            logoImage,
            image,
            link,
        } = gameDetails


        //api call
        const reqBody = new FormData()
        reqBody.append("title", title)
        reqBody.append("description", description)
        reqBody.append("rating", rating)
        reqBody.append("price", price)
        reqBody.append("category", category)
        reqBody.append("logoImage", logoImage)
        preview ? reqBody.append("image", image) : reqBody.append("image", game.image)
        reqBody.append("link", link)

        const reqHeader = {
            "Content-Type": "multipart/form-data", //req contains a file upload content (image)
        }
        const result = await editGamesAPI(id, reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
            handleClose()
            setEditGameRes(result.data)


        }
        else {
            console.log(result.response.data);
        }


    }
    return (
        <div>
            <MDBBtn color='link' rounded size='sm' onClick={handleShow}>
                <i className='fa-solid fa-pen'></i>
            </MDBBtn>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Games</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className='col'>
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={e => setgameDetails({ ...gameDetails, image: e.target.files[0] })} />
                                <img src={preview ? preview : `${base_Url}/uploads/${game.image}`} width={'300px'} height={'300px'} alt="" />
                            </label>
                        </div>
                        <div className="col">
                            <form action="" autoComplete="off">
                                <MDBInput className='form-control mb-3' value={gameDetails.title} onChange={e => setgameDetails({ ...gameDetails, title: e.target.value })} autoComplete="off" label='Title' id='formControlLg' type='email' size="lg" />
                                <MDBInput className='form-control mb-3' value={gameDetails.description} onChange={e => setgameDetails({ ...gameDetails, description: e.target.value })} label='Description' id='formControlLg' type='text' size="lg" autoComplete="off" />

                                <MDBInput className='form-control mb-3' value={gameDetails.rating} onChange={e => setgameDetails({ ...gameDetails, rating: e.target.value })} label='Rating' id='formControlLg' type='text' size="lg" autoComplete="off" />

                                <MDBInput className='form-control mb-3' value={gameDetails.price} onChange={e => setgameDetails({ ...gameDetails, price: e.target.value })} label='Price' id='formControlLg' type='text' size="lg" autoComplete="off" />

                                <label className="label-class" htmlFor="categoryDropdown">Category</label>
                                <select
                                    id="categoryDropdown"
                                    className="form-select mb-4  w-100 "
                                    value={gameDetails.category}
                                    onChange={(e) => setgameDetails({ ...gameDetails, category: e.target.value })}
                                >
                                    {filterListData.map((item) => (
                                        <option key={item._id} value={item.name} className='text-black'>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <MDBInput className='form-control mb-3' value={gameDetails.logoImage} onChange={e => setgameDetails({ ...gameDetails, logoImage: e.target.value })} label='Logo Image' id='formControlLg' type='text' size="lg" autoComplete="off" />

                                <MDBInput className='form-control mb-3' value={gameDetails.link} onChange={e => setgameDetails({ ...gameDetails, link: e.target.value })} label='Trailer Link' id='formControlLg' type='text' size="lg" autoComplete="off" />

                                <div>
                                </div>

                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={gameEdit} >Update</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

    )
}

export default updateUser
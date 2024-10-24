import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from './Sidebar';
import {
    MDBInput,

}
    from 'mdb-react-ui-kit';
import { addGameAPI } from '../../Services/allAPI';
import { addGameResponseContext } from '../../ContextApi/ContextShare';
import filterListData from '../../Assets/js/filterListData';
import { useNavigate } from 'react-router-dom';
function AddGames() {
    const location=useNavigate()
    const { addGameRes, setAddGameRes } = useContext(addGameResponseContext)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleSidebarCollapse = (collapsed) => {
        setSidebarCollapsed(collapsed);
    }

    //to hold project details
    const [gameDetails, setgameDetails] = useState({
        title: "", description: "", rating: "", price: "", category: "", logoImage: "", image: "", link: ""
    })
    console.log(gameDetails);
    //to hold image url
    const [preview, setPreview] = useState("")
    console.log(preview);
    useEffect(() => {
        if (gameDetails.image) {
            setPreview(URL.createObjectURL(gameDetails.image))
        }
    }, [gameDetails.projectImage])
    const gameAdd = async () => {
        const { title,
            description,
            rating,
            price,
            category,
            link,
            logoImage,
            image,
           } = gameDetails
        if (!title || !description || !rating || !price || !category || !logoImage || !image || !link ) {
            alert("please enter details")
        }
        else {
            //api call
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("description", description)
            reqBody.append("rating", rating)
            reqBody.append("price", price)
            reqBody.append("category", category)
            reqBody.append("logoImage", logoImage)
            reqBody.append("image", image)
            reqBody.append("link", link)
            const reqHeader = {
                "Content-Type": "multipart/form-data", //req contains a file upload content (image)
            }
            const result = await addGameAPI(reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
                console.log(result.data);
                alert("Game Added successfully")
                setAddGameRes(result.data)//context access the add project data
                setgameDetails({ title: "", description: "", rating: "", price: "", category: "", logoImage: "", image: "", link: ""})//make thw state value empty
                setPreview("")
                location('/games')
            }
            else {
                alert(result.response.data);
                console.log(result.response.data);
            }
        }
    }
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Row >
                <Col xs={sidebarCollapsed ? 1 : 2}  className="sidebar-col">
                    <Sidebar onCollapse={handleSidebarCollapse} />
                </Col>
                <Col xs={sidebarCollapsed ? 11 : 10} >
                    <Container className='px-5 my-3 '>
                        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                            <h3 className="fw-bold  ps-5 pb-3" style={{ letterSpacing: '3px', color: 'black' }}>
                                Add Games </h3>
                            <form action="" autoComplete="off">
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' value={gameDetails.title} onChange={e => setgameDetails({ ...gameDetails, title: e.target.value })} autoComplete="off" labelClass='label-class' label='Title' id='formControlLg' type='email' size="lg" />
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' value={gameDetails.description} onChange={e => setgameDetails({ ...gameDetails, description: e.target.value })} labelClass='label-class' label='Description' id='formControlLg' type='text' size="lg" autoComplete="off" />
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' value={gameDetails.rating} onChange={e => setgameDetails({ ...gameDetails, rating: e.target.value })} labelClass='label-class' label='Rating' id='formControlLg' type='text' size="lg" autoComplete="off" />
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' value={gameDetails.price} onChange={e => setgameDetails({ ...gameDetails, price: e.target.value })} labelClass='label-class' label='Price' id='formControlLg' type='text' size="lg" autoComplete="off" />
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='label-class' onChange={e => setgameDetails({ ...gameDetails, logoImage: e.target.value })} id='formControlLg' label='Logo Image' type='text' size="lg" autoComplete="off" />
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='label-class' onChange={e => setgameDetails({ ...gameDetails, image: e.target.files[0] })} id='formControlLg' type='file' size="lg" autoComplete="off" />
                                <label className="label-class mx-5 m-2" htmlFor="categoryDropdown">Category</label>
                                <select
                                    id="categoryDropdown"
                                    className="form-select mb-4 mx-5 w-100 "
                                    value={gameDetails.category}
                                    onChange={(e) => setgameDetails({ ...gameDetails, category: e.target.value })}
                                >
                                    {filterListData.map((item) => (
                                        <option key={item._id} value={item.name} className='text-black'>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='label-class' value={gameDetails.link} onChange={e => setgameDetails({ ...gameDetails, link: e.target.value })} label='Trailer Link' id='formControlLg' type='text' size="lg" autoComplete="off" />
                                <div>
                                    <div className='text-center'>
                                        <button class="glow-on-hover mx-5 my-3" type="button" onClick={gameAdd} >Add</button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </Container>
                </Col>
            </Row>


        </div>
    )
}

export default AddGames
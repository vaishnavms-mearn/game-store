import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Col, Container, Row } from 'react-bootstrap'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteGamesAPI, getAllGamesAPI } from '../../Services/allAPI';
import { addGameResponseContext, editGameResponseContext } from '../../ContextApi/ContextShare';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import EditGames from './EditGames';
import ViewGames from './ViewGames';
function Games() {
    const { addGameRes, setAddGameRes } = useContext(addGameResponseContext)
    const { editGameRes, setEditGameRes } = useContext(editGameResponseContext)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleSidebarCollapse = (collapsed) => {
        setSidebarCollapsed(collapsed);
    }
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
    }, [addGameRes, editGameRes])
    const deleteGames = async (gid) => {
        //get the token

        const reqHeader = {
            "Content-Type": "application/json",
        }
        try {
            const result = await deleteGamesAPI(gid, reqHeader)
            console.log(result);
            if (result.status === 200) {
                toast.error("Game deleted successfully")
                allGame()
            }
        }
        catch (err) {
            console.log("deleted successfully");
        }
    }

    return (
        <div style={{ overflowX: 'hidden' }}>

            <Row>
                <Col xs={sidebarCollapsed ? 1 : 2} >
                    <Sidebar onCollapse={handleSidebarCollapse} />
                </Col>
                <Col xs={sidebarCollapsed ? 11 : 10} className='px-5 my-4'>
                    <Container>
                        <h1 className='mx-5 my-3'>Games</h1>
                        <MDBTable>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col' className='ps-5'>Title</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Category</th>
                                    <th scope='col' className='ps-5'>Actions</th>
                                </tr>
                            </MDBTableHead>
                            {allGames.length > 0 ? (
                                allGames.map((item, index) => (
                                    <MDBTableBody>
                                        <tr>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <div className='ms-3'>
                                                        <p className='fw-bold mb-1'>{item.title}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{item.price}</p>
                                            </td>
                                            <td>
                                                <MDBBadge color='success' pill>
                                                    {item.category}
                                                </MDBBadge>
                                            </td>
                                            <td>
                                                <MDBBtn color='link' rounded size='sm'>
                                                    <EditGames game={item} />
                                                </MDBBtn>
                                                <MDBBtn color='link' rounded size='sm'>
                                                    <ViewGames game={item} />
                                                </MDBBtn>
                                                <MDBBtn color='link' rounded size='sm' onClick={() => deleteGames(item._id)}>
                                                    <i class="fa-solid fa-trash"></i>
                                                </MDBBtn>
                                            </td>
                                        </tr>

                                    </MDBTableBody>
                                ))) : (
                                <div className="text-center">no projects found</div>
                            )
                            }
                        </MDBTable>

                    </Container>
                </Col>
            </Row>
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

export default Games
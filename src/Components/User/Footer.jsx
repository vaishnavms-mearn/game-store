import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter style={{ backgroundColor: '#101014' }} className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='facebook-f' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='twitter' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='google' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='instagram' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='linkedin' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='github' />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon color='secondary' icon='gem' className='me-3' />
                                Game Paradise
                            </h6>
                            <p>
                                A game store is a haven for gamers of all kinds, offering a wide range of video games, board games, card games, and gaming accessories. It's a place where enthusiasts gather to discover the latest releases, engage in friendly competition, and connect with like-minded individuals.
                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Languages</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    React
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    MongoDb
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Express JS
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                  Node JS
                                </a>
                            </p>
                        </MDBCol>


                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon color='secondary' icon='home' className='me-2' />
                                New York, NY 10012, US
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                gameparadise@gmail.com
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    gameparadise.com
                </a>
            </div>
        </MDBFooter>
    );
}
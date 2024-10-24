import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './css/sidebar.css';
import img from '../../Assets/images/gamepad.png'
import { MDBNavbarItem } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
const Sidebar = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapseToggle = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapse(newState);
  }
  const [activeLink, setActiveLink] = useState('');

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };
  const existingUser = JSON.parse(sessionStorage.getItem('existingUser'))
  const location = useNavigate();
  const handleLogout = () => {
    // Handle logout logic, e.g., clear session storage
    sessionStorage.removeItem('existingUser');
    location('/login')
};
  return (
    <div className='sidebar-container' style={{ display: 'flex', height: '200vh', overflow: 'scroll initial' }}>
      <CDBSidebar collapsed={collapsed} textColor="#fff" backgroundColor="#1A181B">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={handleCollapseToggle}></i>} >
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          <img
                    src={img}
                    height='40'
                    alt=''
                    className='mx-3'
                    loading='lazy'
                /><h5 className='mt-2'>Game Paradise</h5>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
        <div className='mx-2' onClick={handleLogout}>
                            {existingUser ? (
                                <Button variant="outline-light" className=" w-50 mx-5 btn-sm my-2" >
                                    <i className="fa-solid fa-user fa-fade px-1"></i>   Logout
                                </Button>
                            ) : (

                                    <Button variant="outline-light" className="w-50 mx-5 btn-sm my-2" >
                                        <i className="fa-solid fa-user fa-fade px-1"></i>    Login
                                    </Button>

                            )}
                        </div>
          <CDBSidebarMenu>
            <NavLink exact to="/games"  >
              <CDBSidebarMenuItem
                className={`custom-sidebar-menu-item ${activeLink === '/add-games' ? 'activeClicked ' : ''}`}
                onClick={() => handleNavLinkClick('/games')}
                icon="columns"
              >
                Games
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/add-games"  >
              <CDBSidebarMenuItem  className={`custom-sidebar-menu-item ${activeLink === '/add-games' ? 'activeClicked ' : ''}`}
                onClick={() => handleNavLinkClick('/add-games')}
                icon="table">Add Games</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>


      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
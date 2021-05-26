import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import LogoutButton from "../buttons/LogoutButton";
import './BootstrapNavbar.css';

const BoostrapNavbar = ({ history, setUserLoggedIn}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
        
        <LinkContainer to="/"><Navbar.Brand>Company Overview</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto text-center">
            <NavDropdown title="Employees" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/employees" className="custom-link">View All</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/employees/new" className="custom-link">Add Employee</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Departments" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/departments" className="custom-link">View All</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/departments/new" className="custom-link">Add Department</NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="Roles" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/roles" className="custom-link">View All</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/roles/new" className="custom-link">Add Role</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <LogoutButton history={history} setUserLoggedIn={setUserLoggedIn} />
        </Navbar.Collapse>
      </Navbar>
  )
}


export default BoostrapNavbar;
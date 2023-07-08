import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ marginBottom: 0 }}>
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ height: '55px' }}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to="/"></NavLink>
                        <NavLink className="nav-link" to="/watchList"></NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Footer
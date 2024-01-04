import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.jpg';
import '../stylesheets/MainNavbar.css';

const MainNavbar = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary mb-4 mt-4 mainNav">
                <Container fluid>
                    <Navbar.Brand href="/" style={{ color: '#2D3092', fontSize:'x-large'}} >
                        <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top mx-4" />{' '}
                        Academix
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href='/courses-list'>Courses</Nav.Link>
                            <Nav.Link href='/tutoring'>Tutoring</Nav.Link>
                            <Nav.Link href='/logout'>Logout</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">
                            Search
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default MainNavbar;

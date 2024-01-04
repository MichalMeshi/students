import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo.jpg';
import '../stylesheets/MainNavbar.css';
import { GiGraduateCap } from "react-icons/gi";
import { Col,Row } from 'react-bootstrap';

const MainNavbar = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary mb-4 mainNav shadow-lg">
                <Container fluid>
                    <Navbar.Brand href="/" style={{ color: '#2D3092', fontSize: 'x-large' }} >
                        {/* <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top mx-4" />{' '} */}
                        <Row>
                            <Col>
                                <GiGraduateCap size={60} />
                            </Col>
                            <Col className='d-flex justify-content-center align-items-center'>
                                <h2>Academix</h2>
                            </Col>
                        </Row>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link  href='/courses-list'><div className='nav-link'>Courses</div></Nav.Link>
                            <Nav.Link  href='/tutoring'><div className='nav-link'>Tutoring</div></Nav.Link>
                            <Nav.Link  href='/logout'><div className='nav-link'>Log out</div></Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            {/* <Button variant="outline-primary">
                                Search
                            </Button> */}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default MainNavbar;

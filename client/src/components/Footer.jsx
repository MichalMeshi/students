import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import '../stylesheets/footer.css'
import footerImg from '../images/imgfooter.png'
export default function Footer() {
    return (
        <div>
            <img id='footer-img' src={footerImg} className='mt-5'></img>
            <div id='footer' className='container-fluid pb-3'>
                <Row>
                    <Col xs={12} md={4} id='footer-col'>
                        <ul className='list-unstyled m-3'>
                            <li className='m-2'>
                                <Row>
                                    <Col xs={2} md={1} >
                                        <IoLocationSharp size={25} color='white' />
                                    </Col>
                                    <Col xs={10} md={10} >
                                        Dizengoff center, Tel Aviv, IL
                                    </Col>
                                </Row>
                            </li>
                            <li className='m-2'>
                                <Row>
                                    <Col xs={2} md={1}>
                                        <MdOutlineAlternateEmail size={25} color='white' />
                                    </Col>
                                    <Col xs={10} md={10}>
                                        academix@org.il
                                    </Col>
                                </Row></li>
                            <li className='m-2'>  <Row>
                                <Col xs={2} md={1}>
                                    <MdOutlineEmail size={25} color='white' />
                                </Col>
                                <Col xs={10} md={10}>
                                    237756 PO box
                                </Col>
                            </Row></li>
                            <li className='m-2'>  <Row>
                                <Col xs={2} md={1}>
                                    <CiPhone size={25} color='white' />
                                </Col>
                                <Col xs={10} md={10}>
                                    +972 456 789 12
                                </Col>
                            </Row></li>
                        </ul>
                    </Col>
                    <Col id='social' xs={12} md={4} className='d-flex text-align-center justify-content-center'>
                        <div>
                            <h2 className='m-3'>Let's get social</h2>
                            <Row className='justify-content-center align-items-center'>
                                <Col xs={2} md={2}>
                                    <FaFacebookSquare size={30} />
                                </Col>
                                <Col xs={2} md={2}>
                                    <FaTwitterSquare size={30} />
                                </Col>
                                <Col xs={2} md={2}>
                                    <FaLinkedin size={30} />
                                </Col>
                                <Col xs={2} md={2}>
                                    <FaGithubSquare size={30} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

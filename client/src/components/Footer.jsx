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


export default function Footer() {
    return (
        <div className='container-fluid'>
            <Row>
                <Col sm={12} md={6}>
                    <ul className='list-unstyled'>
                        <li>
                            <Row>
                                <Col md={1}>
                                    <IoLocationSharp size={25} color='black' />
                                </Col>
                                <Col md={10}>
                                    Dizengoff center, Tel Aviv, IL
                                </Col>
                            </Row>
                        </li>
                        <li>  <Row>
                            <Col md={1}>
                                <MdOutlineAlternateEmail size={25} color='black' />
                            </Col>
                            <Col md={10}>
                                academix@org.il
                            </Col>
                        </Row></li>
                        <li>  <Row>
                            <Col md={1}>
                                <MdOutlineEmail size={25} color='black' />
                            </Col>
                            <Col md={10}>
                                237756 PO box
                            </Col>
                        </Row></li>
                        <li>  <Row>
                            <Col md={1}>
                                <CiPhone size={25} color='black' />
                            </Col>
                            <Col md={10}>
                                +972 456 789 12
                            </Col>
                        </Row></li>
                    </ul>
                </Col>
                <Col sm={12} md={6}>
                    <h2>Let's get social</h2>
                    <Row>
                        <Col md={3}>
                            <FaFacebookSquare size={30} />
                        </Col>
                        <Col md={3}>
                            <FaTwitterSquare size={30} />
                        </Col>
                        <Col md={3}>
                            <FaLinkedin size={30}/>
                    </Col>
                        <Col md={3}>
                            <FaGithubSquare size={30}/>
                    </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

import React, { useContext, useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import ForumContext from '../context/ForumContext'
import MiniProfile from './MiniProfile';
import { PiClockCounterClockwiseLight } from 'react-icons/pi';
import '../stylesheets/tutoringpost.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MdContactMail } from 'react-icons/md';
import { IoIosContact } from 'react-icons/io';
import { FaCity } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { TiContacts } from "react-icons/ti";
import { LiaQuoteLeftSolid } from "react-icons/lia";
import { LiaQuoteRightSolid } from "react-icons/lia";
import { BsBlockquoteLeft } from "react-icons/bs";

const TutoringPost = ({ post }) => {
    useEffect(()=>{
        AOS.init();
    },[])
    const { getTimeSincePostCreation } = useContext(ForumContext);
    return (
        <Card id='tutoring-card' className="mt-3 w-100 card-border" data-aos="fade-up">
            <Card.Title id='mini-profile' className='m-0'>
                <Row>
                    <Col xs={7} md={9} className='pt-1 '>

                        <MiniProfile userId={post?.ownerId} />
                    </Col>
                    <Col md={3} xs={5} >
                        <Row className='my-row' >
                            <Col id='time-col' xs={7}>
                                <div id='time'>{getTimeSincePostCreation(post?.dateCreated)}</div>
                            </Col>
                            <Col xs={5} className='d-flex justify-content-start align-items-center'>
                                <PiClockCounterClockwiseLight size={20} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
            </Card.Title>
            <Card.Body>
                <div className='text-center'>
                    <h3 className='m-0 p-0 bold'>{post.subject}</h3>
                    <p className='m-0 p-0 bold'>{post.field}</p>
                </div>
                <div className='m-3'>
                    <Row>
                        <Col xs={2} md={2} className='d-flex justify-content-end align-items-end'>
                            <BsBlockquoteLeft size={60} />
                        </Col>
                        <Col xs={10} md={10} className='g'>
                            <div className='message'>{post.message}</div>
                        </Col>
                    </Row>
                </div>


                <hr />
                <Card.Text>
                    <Row style={{ color: "grey" }}>
                        <Col xs={6} md={6} className='d-flex justify-content-center align-items-center'>
                            <div>
                                <IoLocationSharp size={25} color='grey' /> {post.city}
                            </div>
                        </Col>
                        <Col xs={6} md={6} className='d-flex justify-content-center align-items-center'>
                            <div>
                                <TiContacts size={25} color='grey' />{post.contactInfo}
                            </div>
                        </Col>
                    </Row>

                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default TutoringPost
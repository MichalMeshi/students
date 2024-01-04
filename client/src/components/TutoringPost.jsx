import React, { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import ForumContext from '../context/ForumContext'
import MiniProfile from './MiniProfile';
import { PiClockCounterClockwiseLight } from 'react-icons/pi';
import '../stylesheets/post.css'
import { MdContactMail } from 'react-icons/md';
import { IoIosContact } from 'react-icons/io';
import { FaCity } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

const TutoringPost = ({ post }) => {
    const { getTimeSincePostCreation } = useContext(ForumContext);
    return (
        <Card className="mt-3 w-100" style={{ border: 'dashed 2px #5055d1', background: '#E6F7FF' }}>
            <Card.Title id='mini-profile' className='m-0'>
                <Row>
                    <Col xs={7} md={9} className='pt-1 '>
                        <MiniProfile userId={post.ownerId} />
                    </Col>
                    <Col md={3} xs={5} >
                        <Row className='my-row' >
                            <Col id='time-col' xs={7}>
                                <div id='time'>{getTimeSincePostCreation(post?.dateCreated)} ago</div>
                            </Col>
                            <Col xs={5} className='d-flex justify-content-start align-items-center'>
                                <PiClockCounterClockwiseLight size={20} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Title>
            <hr style={{ border: 'dashed 1px #5055d1' }} />
            <Card.Text className='text-center'>
                <h2>{post.subject}</h2>
                <h5>{post.field}</h5>
            </Card.Text>
            <Card.Body>
                <h3><AiFillMessage /> {post.message}</h3>
                <h3><FaCity /> {post.city}</h3>
                <h3><IoIosContact /> {post.ownerName}</h3>
                <h3><MdContactMail /> {post.contactInfo}</h3>
            </Card.Body>
        </Card>
    )
}

export default TutoringPost
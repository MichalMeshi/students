import React, { useContext, useEffect, useRef, useState } from 'react'
import CommentDisplay from './CommentDisplay';
import ForumContext from '../context/ForumContext';
import SummaryContext from '../context/SummaryContext';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { IoIosSend } from "react-icons/io";
import { MdOutlineComment } from "react-icons/md";
import ProfileContext from '../context/ProfileContext';
import MiniProfile from './MiniProfile';
import { PiClockCounterClockwiseLight } from "react-icons/pi";
import '../stylesheets/post.css'
export default function Post(props) {
    const { post } = props;
    const [comments, setcomments] = useState([]);
    const [commentFlag, setcommentFlag] = useState(false)
    const [btnCloseFlag, setbtnCloseFlag] = useState(false);
    const [btnOpenFlag, setbtnOpenFlag] = useState(true);
    const { getCommentsOfPost, addCommentToPost, getTimeSincePostCreation } = useContext(ForumContext);
    const { profileData } = useContext(ProfileContext);
    const inputRef = useRef(null);
    const getMyComments = async () => {
        const res = await getCommentsOfPost(post._id);
        console.log({ res });
        // const temp=res.map((comment)=>comment.content)
        // console.log({temp});
        if (res)
            setcomments(res)
        setbtnCloseFlag(true)
        setcommentFlag(true)
        setbtnOpenFlag(false)
    }
    const toggleCommentFlag = () => {
        setcommentFlag(false)
        setbtnCloseFlag(false)
        setbtnOpenFlag(true)
    }
    const handleAddComment = async () => {
        const { value } = inputRef.current;
        const res = await addCommentToPost(post._id, value);
        await getMyComments();
        setcomments([...comments, res]);
        inputRef.current.value = "";

    }


    return (
        <Card id='forum-card' className="mt-3 w-100" >
            <Card.Title id='mini-profile' className='m-0'>
                <Row>
                    <Col xs={7} md={9} className='pt-1 '>
                        <MiniProfile userId={post.userId} />
                    </Col>
                    <Col md={3} xs={5} >
                        <Row className='my-row' >
                            <Col id='time-col' xs={7}>
                                <div id='time' style={{color:"grey"}}>{getTimeSincePostCreation(post?.dateCreated)}</div>
                            </Col>
                            <Col xs={5} className=' d-flex justify-content-start align-items-center'>
                                <PiClockCounterClockwiseLight size={20} color='grey' />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Title>
            <hr />
            <div className='text-center'>
                <h2>{post.title}</h2>
                <h5>{post.info}</h5>
            </div>
            <Card.Body>
                <Row className="mt-3 mb-3">
                    <Col md={9}>
                        <div className='d-flex'>
                            <Form.Control type="text" placeholder="Your comment..." ref={inputRef} required className='mx-1' />
                            <Button id='send-btn' onClick={handleAddComment} > <IoIosSend size={20} style={{ cursor: 'pointer' }} color='blue' /></Button>
                        </div>

                    </Col>
                    <Col md={3}>
                        {btnOpenFlag && (
                            <button className='btn comments-btn' onClick={() => { getMyComments() }}>
                                <MdOutlineComment /> Comments
                            </button>
                        )}

                        {btnCloseFlag && (
                            <button className='btn comments-btn' onClick={toggleCommentFlag}>
                                Close
                            </button>
                        )}
                    </Col>

                </Row>
                {commentFlag && comments.map((comment, index) => {
                    return <CommentDisplay key={index} comment={comment} />;
                })}
            </Card.Body>
        </Card>

    )
}

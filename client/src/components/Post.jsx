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
        <Card className="mt-3">
            <Card.Title id='mini-profile' className='m-0'>
                <Row>
                    <Col md={9}>
                        <MiniProfile userId={post.userId} />
                    </Col>
                    <Col md={3} className='border'>
                        <Row>
                            <Col id='time-col' xs={8} className='border'>
                        <p id='time'>{getTimeSincePostCreation(post?.dateCreated)} ago</p>
                        </Col>
                        <Col xs={3} className='border  d-flex justify-content-center align-items-center'>
                        <PiClockCounterClockwiseLight size={20}/>
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Title>
            <hr></hr>
            {/* <Row>
                    <Col xs={4}>
                    </Col>
                    <Col >
                        <h3 style={{ fontWeight: 'bold' }}>{post?.title}</h3>
                        <h4>{post?.field}</h4>
                        <Card.Text> {post?.info}</Card.Text>
                    </Col>
                </Row> */}
            <Row>
            </Row>

            <Row className="mt-3 mb-3">
                <Col>
                    {btnOpenFlag && (
                        <Button style={{ backgroundColor: '#5055d1' }} onClick={() => { getMyComments() }}>
                            <MdOutlineComment /> Comments
                        </Button>
                    )}

                    {btnCloseFlag && (
                        <Button style={{ backgroundColor: '#5055d1' }} onClick={toggleCommentFlag}>
                            Close
                        </Button>
                    )}

                </Col>
                <Col xs={7}>
                    <div className='d-flex'>
                        <Form.Control type="text" placeholder="Add your comment..." ref={inputRef} required />
                        <Button style={{ backgroundColor: '#5055d1' }} onClick={handleAddComment} > <IoIosSend size={20} style={{ cursor: 'pointer' }} /></Button>
                    </div>
                </Col>

            </Row>
            {commentFlag && comments.map((comment, index) => {
                return <CommentDisplay key={index} comment={comment} />;
            })}
            {/* </Container> */}
        </Card>

    )
}

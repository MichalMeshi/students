import React, { useContext, useEffect, useRef, useState } from 'react'
import CommentDisplay from './CommentDisplay';
import ForumContext from '../context/ForumContext';
import SummaryContext from '../context/SummaryContext';
import { Card, Button, Form } from 'react-bootstrap';
import { IoIosSend } from "react-icons/io";
import { MdOutlineComment } from "react-icons/md";
import ProfileContext from '../context/ProfileContext';
import MiniProfile from './MiniProfile';

export default function Post(props) {
    const { post } = props;
    const [comments, setcomments] = useState([]);
    const [commentFlag, setcommentFlag] = useState(false)
    const [btnCloseFlag, setbtnCloseFlag] = useState(false);
    const [btnOpenFlag, setbtnOpenFlag] = useState(true);
    const { getCommentsOfPost, addCommentToPost } = useContext(ForumContext);
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
    const getTimeSincePostCreation = (dateString) => {
        const postDate = new Date(dateString); // Convert the date string to a Date object
        const currentDate = new Date(); // Get the current date and time

        const timeDifference = currentDate - postDate; // Calculate the time difference in milliseconds
        console.log({});
        // Convert milliseconds to days
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // Convert days to weeks, months, or years as necessary
        if (days >= 7) {
            const weeks = Math.floor(days / 7);
            return `${weeks}w`;
        }
        else if (days >= 1) {
            return `${days}d`;
        }
        else {
            // Convert milliseconds to hours
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));

            if (hours >= 1) {
                return `${hours}h`;
            }
            else {
                // Convert milliseconds to minutes
                const minutes = Math.floor(timeDifference / (1000 * 60));

                if (minutes > 1) {
                    return `${minutes}m`;
                }
                else {
                    // Display 'now' for the time difference less than a minute
                    return 'now';
                }
            }
        }
    };


    return (
        <Card>
            <Card.Header className='d-flex'>
                {console.log(profileData.id)}
                {/* <p>{profileData.id === post.userId._id ? 'You' :
                    post.userId.name} </p> */}
                <MiniProfile userId={post.userId} />
                <p>({getTimeSincePostCreation(post.dateCreated)} ago)</p>
            </Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>More info about the question:<br /> {post.info}</Card.Text>

                {btnOpenFlag && (
                    <Button variant="dark" onClick={() => { getMyComments() }}>
                        <MdOutlineComment /> Comments
                    </Button>
                )}

                {btnCloseFlag && (
                    <Button variant="dark" onClick={toggleCommentFlag}>
                        Close
                    </Button>
                )}

                {commentFlag && comments.map((comment, index) => {
                    return <CommentDisplay key={index} comment={comment} />;
                })}
                <div className='d-flex'>
                    <Form.Control type="text" placeholder="type here..." ref={inputRef} required />
                    <Button variant='dark' onClick={handleAddComment} >Send <IoIosSend size={25} style={{ cursor: 'pointer' }} /></Button>
                </div>
            </Card.Body>
        </Card>

    )
}

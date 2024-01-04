import React, { useEffect, useState } from 'react'
import { Card,Row,Col } from 'react-bootstrap'
import PostList from './PostList';
import Post from './Post';

export default function MyForums() {
    const [myForums, setmyForums] = useState([])
    const getMyForums = async () => {

        try {
            const token = localStorage.getItem("token");
            console.log({token});
            if (token) {
                const res = await fetch('http://localhost:3000/forums/posts/myposts', {
                    headers: {
                        "authorization": token
                    }
                })
                
                const temp = await res.json();
                console.log({temp});
                if (Array.isArray(temp))
                setmyForums([...temp]);
                console.log({ myForums });
            }
            else
                setError("You have to login to view your courses");

        } catch (error) {
            setError(error.message);
        }
    }
    useEffect(() => {
        getMyForums();
    }, [])
    return (
        <div className='container-fluid mt-5 pt-3'>
            <div className='container'>
                <Card>
                    <Card.Header>
                        <h3>#MY FORUMS</h3>
                    </Card.Header>
                    <Card.Body>
                        <Row className='bor'>
                {myForums.length? myForums.map((forum, index) => {
                    return <Col className='d-flex justify-content-center align-items-center mb-3' md={12} key={index} >
                        <Post
                            post={forum} />
                    </Col>
                }) :  <p>No Forums have been created yet.</p>}
                
            </Row>
                    </Card.Body>
                </Card>
                {/* {error ? <Alert variant="danger">{error}</Alert> : ""} */}
            </div>
        </div>
    )
}

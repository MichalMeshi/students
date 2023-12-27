import React from 'react'
import { Card } from 'react-bootstrap'

const TutoringPost = ({ post }) => {
    return (
        <div>
            <Card className='my-2' style={{width:'18em'}}>
                <h3>{post.subject}</h3>
                <h3>{post.field}</h3>
                <h3>{post.message}</h3>
                <h3>{post.city}</h3>
                <h3>{post.ownerName}</h3>
                <h3>{post.contactInfo}</h3>
                <h3>{post.dateCreated.split('T')[0]}</h3>
            </Card>
        </div>
    )
}

export default TutoringPost
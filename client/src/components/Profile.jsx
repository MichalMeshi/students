import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ProfileContext from '../context/ProfileContext'

const Profile = () => {
    const { profileData } = useContext(ProfileContext);
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <img src={profileData.image} alt="profileImg" />
                    <h2>{profileData.rate}</h2>
                </Col>
                <Col md={8}>
                    <h3>{profileData.name}</h3>
                    <h3>{profileData.college}</h3>
                    <h3>{profileData.address}</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile
import React, { useContext, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ProfileContext from '../context/ProfileContext';
import { CiEdit } from "react-icons/ci";
import EditProfile from '../components/EditProfile';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const Profile = () => {
    const { profileData } = useContext(ProfileContext);
    const [edit, setEdit] = useState(false);

    // Function to render 5 stars based on rate
    const renderStars = (rate) => {
        const filledStars = Math.floor(rate); // Full stars
        const decimalPart = rate - filledStars; // Decimal part for half star

        const stars = [];

        // Add filled stars
        for (let i = 0; i < filledStars; i++) {
            stars.push(<span key={i}><IoStar /></span>);
        }

        // Add half star if decimal part is greater than 0.5
        if (decimalPart >= 0.5) {
            stars.push(<span key="half"><IoStarHalf /></span>);
        }

        // Add remaining empty stars
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`}><IoStarOutline /></span>);
        }

        return stars;
    };

    return (
        <Container>
            <Card>
                <Row>
                    <Col md={4}>
                        {/* {console.log(profileData?.image)} */}
                        {profileData?.image ? (
                            <img src={profileData.image} alt="profileImg" width={50} />
                        ) : (
                            <img width={50} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Empty Profile" />
                        )}
                        <h2>{renderStars(profileData?.rate)}</h2>
                    </Col>
                    <Col md={8}>
                        <h3>{profileData?.name}</h3>
                        <h3>{profileData?.college}</h3>
                        <h3>{profileData?.address}</h3>
                    </Col>
                    <CiEdit onClick={() => setEdit(true)} style={{ cursor: "pointer" }}></CiEdit>
                    {edit ? (<EditProfile setEdit={setEdit} />) : null}
                </Row>
            </Card>
        </Container>
    );
}

export default Profile;

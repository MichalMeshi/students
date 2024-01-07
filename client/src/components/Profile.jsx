import React, { useContext, useState } from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import ProfileContext from '../context/ProfileContext';
import { CiEdit } from "react-icons/ci";
import EditProfile from '../components/EditProfile';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import '../stylesheets/profile.css'
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
            stars.push(<span key={i}><IoStar color='#FFD43A' /></span>);
        }

        // Add half star if decimal part is greater than 0.5
        if (decimalPart >= 0.5) {
            stars.push(<span key="half"><IoStarHalf color='#FFD43A' /></span>);
        }

        // Add remaining empty stars
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`}><IoStarOutline color='#FFD43A' /></span>);
        }

        return stars;
    };

    return (
        <div id='profile-card' className="shadow-lg rounded">
            <Card id='card-details' className=' p-2'>
                <Row className='w-100 profile-row-strip'>
                    <Col className='p-col bord d-flex text-align-center justify-content-center' md={2}>
                        <div>
                            <Image roundedCircle src={profileData.image} alt="profileImg" width={80} />

                            {/* {profileData?.image ? (
                                <Image roundedCircle src={profileData.image} alt="profileImg" width={80} />
                            ) : (
                                <Image roundedCircle className='rounded' width={80} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Empty Profile" />
                            )} */}
                            <div>{renderStars(profileData?.rate)}</div>
                        </div>
                    </Col>
                    <Col className='bord p-col col-sm' md={9}>
                        <div id='personal-details'>
                            <h3>{profileData?.name}</h3>
                            <p>{profileData?.college}, {profileData?.address}</p>
                        </div>
                    </Col>
                    <Col className='bord p-col col-sm' md={1}>
                        <CiEdit id='edit-symbol' size={25} onClick={() => setEdit(true)} style={{ cursor: "pointer" }}></CiEdit>
                        {edit ? (<EditProfile setEdit={setEdit} />) : null}
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Profile;

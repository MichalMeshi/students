import React, { useContext, useEffect, useState } from 'react'
import ProfileContext from '../../context/ProfileContext';
import './MiniProfile.css'
import { Col, Row } from 'react-bootstrap'
export default function MiniProfile(props) {
    const { userId } = props;
    const {profileData} = useContext(ProfileContext)

    return (

        <Row className ='w-100 m-2'>
                    {/* {(userId.id === profileData.id) && console.log("yes")}
                    {(userId.id !== profileData.id) && console.log("no")}

                    {console.log({userId} ,'=',{profileData})} */}
            <Col sm={3} md={1} className='circle-img d-flex align-items-center' >
                <img className='profile-image'src={(userId?.image)||(profileData.image)} width={40} height={40} alt="Profile Image"  />
            </Col>

            <Col sm={9} md={10} className=' p-0'>
                   <div className=' p-0 mt-2'>{(userId?.name)||(profileData.name)}</div> 
            </Col>
        
        </Row>
        
    )

}

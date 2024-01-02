import React, { useContext, useEffect, useState } from 'react'
import ProfileContext from '../../context/ProfileContext';
import './MiniProfile.css'
import { Col, Row } from 'react-bootstrap'
export default function MiniProfile(props) {
    const { userId } = props;
    return (

        <Row className =''>
                    {console.log({userId})}
            <Col sm={3} className='circle-img d-flex align-items-center' >
                <img className='profile-image'src={userId.image} width={40} height={40} alt="Profile Image"  />
            </Col>

            <Col sm={9} className=' p-0'>
                   <div className=' p-0 mt-2'>{userId.name}</div> 
            </Col>
        
        </Row>
    )

}

import React from 'react'
import { CiLocationOn } from "react-icons/ci";

export default function LocationCard(props) {
    const cardStyle = {
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Optional: Add a box shadow for a subtle effect
        display: 'flex'      
    };

    const imgStyle = {
        borderRadius: '50%',
    };


    const { userId, distance } = props;

    return (
        <div style={cardStyle} className=''>

            <div className='w-100 d-flex'>
            <CiLocationOn />
            </div>
            <hr/>
            <div style={imgStyle}>
                <img width = {50 } height={50} style={imgStyle} src={userId.image}/>
            </div>
            <div className='w-100 d-flex'>
            <h4>{userId.name}</h4>
            </div>
            <div className='w-100 d-flex'>
            {distance} KM from you
            </div>

            </div>
    )
}

import React from 'react'
import { CiLocationOn } from "react-icons/ci";

export default function LocationCard(props) {
    const cardStyle = {
        // width: '250px',
        // height: '250px',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Optional: Add a box shadow for a subtle effect
    };

    const imgStyle = {
        borderRadius: '50%',
    };


    const { userId, distance } = props;

    return (
        <div style={cardStyle} className='w-25 rounded-5 rounded-circle d-flex flex-column justify-content-center align-items-center overflow p-4'>

            
            <CiLocationOn />
    
            
                <img className='rounded-circle w-50' src={userId.image}/>
            <h4>{userId.name}</h4>
            <h5>{distance} KM from you</h5>

            </div>
    )
}

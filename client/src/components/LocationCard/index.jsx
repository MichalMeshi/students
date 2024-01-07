import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { CiLocationOn } from "react-icons/ci";
import ModalContactDitails from '../ModalContactDitails';
import './LocationCard.css'
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export default function LocationCard(props) {
    const [openLocationModal, setOpenLocationModal] = useState(false);
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


    const { userId, distance } = props;

    return (
        <div>

        <div className="cardy col-sm-12 col-md-4 m-3">
          <div className="card-content">
            <div className="image">
              <img src={userId.image}
               alt="userId.image"/>
            </div>
            <hr></hr>
            <div>{renderStars(userId?.rate)}</div>

            <div className="name-profession">
              <span className="name">{userId.name}</span>
              <span className="profession">{distance} KM from you</span>
            </div>
            <div className="">
            </div>
            <button style={{color:"#2D3092"}}
                        onClick={() => setOpenLocationModal(true)}
                        >more
                        <br/> Information                        </button>
                          {openLocationModal &&
                <ModalContactDitails openLocationModal={openLocationModal} setOpenLocationModal={setOpenLocationModal} userId={userId}/>
            }
          </div>
        </div>

        </div>

    )
}

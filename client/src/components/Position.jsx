// import React, { useState, useEffect } from 'react';

// const Position = () => {
//     const [location, setLocation] = useState(null);
//     const [error, setError] = useState(null);

//     const getDistanse = () => {
//         const R = 6371e3; // metres
//         const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
//         const φ2 = lat2 * Math.PI / 180;
//         const Δφ = (lat2 - lat1) * Math.PI / 180;
//         const Δλ = (lon2 - lon1) * Math.PI / 180;

//         const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//         const d = R * c; // in metres
//         console.log(d)
//         return d;

//     }
//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setLocation({ latitude, longitude });
//                 },
//                 (err) => {
//                     setError(err.message);
//                 }
//             );
//         } else {
//             setError('Geolocation is not supported by your browser');
//         }
//     }, []);

//     return (
//         <div>
//             {/* {getDistanse} */}

//             {error ? (
//                 <p>Error: {error}</p>
//             ) : location ? (
//                 <p>
//                     Your current location is: <br />
//                     Latitude: {location.latitude}, Longitude: {location.longitude}
//                 </p>
//             ) : (
//                 <p>Fetching location...</p>
//             )}
//                </div>
//     );
// };

// export default Position;

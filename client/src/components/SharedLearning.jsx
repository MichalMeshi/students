import React, { useState, useEffect, useContext } from 'react';
import ProfileContext from '../context/ProfileContext';
import MiniProfile from './MiniProfile';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LocationCard from './LocationCard';
import Sidebar from './Sidebar';
import CourseContext from '../context/CourseContext';


export default function SharedLearning(props) {

  const { allusers, profileData } = useContext(ProfileContext)
  const { courseId, courseName } = useParams();
  const [distance, setdistance] = useState(0)
  const [isOpen, setIsOpen] = useState(false); // State to manage the sidebar's open/close state

  const getDistanse = (lat1, lat2, lon1, lon2) => {
    const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180, Δλ = (lon2 - lon1) * Math.PI / 180, R = 6371e3;
    const d = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
    return d / 1000;


  }

  return (
    <>
      <Sidebar courseId={courseId} courseName={courseName} isOpen={isOpen} setIsOpen={setIsOpen} />

      <Container className={`course-detail-page ${isOpen ? 'sidebar-open' : ''} `}>

        <h1 className='display-2'>People in your area:</h1>
        {
          (profileData.location) && (allusers.length === 1) &&
          <h2>There are no users in your area</h2>
        }
        {
          (profileData.location) &&
          allusers.filter((user) => { if (user.myCourses.includes(courseId) && user.id !== profileData.id && user.location) { return true } })
            .sort((a, b) => getDistanse(a.location?.lat, profileData.location?.lat, a.location?.lon, profileData.location?.lon) - getDistanse(b.location?.lat, profileData.location?.lat, b.location?.lon, profileData.location?.lon))
            .slice(0, 10) // Limit to the first 10 results
            .map((user, index) => (
              <LocationCard userId={user} key={index} distance={(getDistanse(user.location?.lat, profileData.location?.lat,
                user.location?.lon, profileData.location?.lon).toFixed(2))} />
            ))
        }
        {
          (!profileData.location) &&
          <h2>your loaction is not allowd</h2>
        }
      </Container >
    </>

  )
}




// import axios from 'axios';
// const SharedLearning = () => {
//     const [location?, setLocation] = useState({
//         loaded: false,
//         coordinates: { lat: '', lon: '' },
//         address: '',
//     });

//     useEffect(() => {
//         const getLocation = () => {
//             if ('geolocation' in navigator) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const { latitude, longitude } = position.coords;
//                         setLocation({
//                             loaded: true,
//                             coordinates: {
//                                 lat: latitude,
//                                 lon: longitude,
//                             },
//                             address: '',
//                         });
//                         getAddress(latitude, longitude);
//                     },
//                     (error) => {
//                         console.error('Error getting location:', error);
//                     }
//                 );
//             } else {
//                 setLocation((prev) => ({ ...prev, loaded: true }));
//             }
//         };

//         const getAddress = async (lat, lon) => {
//             try {
//                 const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cdf8e3445a110e40bd95e3523ef6d3c3`);
//                 setLocation((prev) => ({ ...prev, address: response.data.name }));
//             } catch (error) {
//                 console.error('Failed to fetch weather data:', error);
//             }
//         };


//         getLocation();
//     }, []);

//     return (
//         <>
//             <div className="separator">Hook 3: User Geo Location Hook</div>

//             <div className="row d-flex justify-content-center mt-3 mb-5 pb-5">
//                 <div className="col-6">
//                     <div className="card">
//                         <div className="card-header text-left font-weight-bold d-flex">
//                             <div className="inline-block mr-auto pt-1">
//                                 {location.loaded ? (
//                                     <>
//                                         <div>Coordinates: {JSON.stringify(location.coordinates)}</div>
//                                         <div>Address: {location.address || 'Loading address...'}</div>
//                                     </>
//                                 ) : (
//                                     'Location data not available yet.'
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SharedLearning;

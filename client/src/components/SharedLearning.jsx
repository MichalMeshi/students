import React, { useState, useEffect, useContext } from 'react';
import ProfileContext from '../context/ProfileContext';
import MiniProfile from './MiniProfile';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export default function SharedLearning(props) {
  const { allusers,profileData } = useContext(ProfileContext)
  const { courseId } = useParams();
  const [location, setLocation] = useState('');

  const getDistanse = (lat1, lat2, lon1, lon2) => {
    const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180, Δλ = (lon2 - lon1) * Math.PI / 180, R = 6371e3;
    const d = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
    return d/1000;


  }
  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            (err) => {
                setError(err.message);
            }
        );
    } else {
        setError('Geolocation is not supported by your browser');
    }
}, []);


  return (
    <div>
      <h1 className='display-2'>People in your area:</h1>
{ console.log({location})}
      {
      allusers?.filter((user) => {if(user.myCourses.includes(courseId)&&user.id!==profileData.id){return true}})
      .sort((a, b) => getDistanse(a.address[0],profileData.address[0],a.address[1],profileData.address[1]) - getDistanse(b.address[0],profileData.address[0],b.address[1],profileData.address[1]))
      .slice(0, 10) // Limit to the first 10 results
        .map((user,index) => (
          <Card className='m-2 w-50'>
          <MiniProfile userId={user} key={index}/>
          <h2> {getDistanse(user.address[0],profileData.address[0],user.address[1],profileData.address[1]).toFixed(2)} kilometer from you</h2>
          </Card>
        ))
        }
    </div>
  )
}




// import axios from 'axios';
// const SharedLearning = () => {
//     const [location, setLocation] = useState({
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

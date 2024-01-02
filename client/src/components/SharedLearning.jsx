import React, { useState, useEffect } from 'react';
import axios from 'axios';
const SharedLearning = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: '', lon: '' },
        address: '',
    });

    useEffect(() => {
        const getLocation = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({
                            loaded: true,
                            coordinates: {
                                lat: latitude,
                                lon: longitude,
                            },
                            address: '',
                        });
                        getAddress(latitude, longitude);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                setLocation((prev) => ({ ...prev, loaded: true }));
            }
        };

        const getAddress = async (lat, lon) => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cdf8e3445a110e40bd95e3523ef6d3c3`);
                setLocation((prev) => ({ ...prev, address: response.data.name }));
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
            }
        };


        getLocation();
    }, []);

    return (
        <>
            <div className="separator">Hook 3: User Geo Location Hook</div>

            <div className="row d-flex justify-content-center mt-3 mb-5 pb-5">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header text-left font-weight-bold d-flex">
                            <div className="inline-block mr-auto pt-1">
                                {location.loaded ? (
                                    <>
                                        <div>Coordinates: {JSON.stringify(location.coordinates)}</div>
                                        <div>Address: {location.address || 'Loading address...'}</div>
                                    </>
                                ) : (
                                    'Location data not available yet.'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SharedLearning;

import React, { useContext, useEffect } from 'react'
import ProfileContext from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(ProfileContext);
    const navigate = useNavigate();
    useEffect(() => {
        logout();
        navigate('/login')
    }, [])
    return (
        <div> Logout Succesfully</div >
    )
}

export default Logout
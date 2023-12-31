import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import ProfileContext from '../context/ProfileContext';
const Navbar = () => {
    // const { userLoggedIn } = useContext(ProfileContext);
    return (
        <nav>
            {/* {console.log(userLoggedIn)} */}
            <Link to='/'>Home </Link>
            {/* {!userLoggedIn && <Link to="/register">Register </Link>}
            {!userLoggedIn && <Link to="/login">Login </Link>} */}
            <Link to="/register">Register </Link>
            <Link to="/login">Login </Link>
            {/* {userLoggedIn && <Link to='/logout'>Logout </Link>} */}
            <Link to='/courses-list'>Courses </Link>
            <Link to='/tutoring'>Tutoring </Link>
            <Link to='/forum'>Forum </Link>
            <Link to='/logout'>Logout </Link>
        </nav>
    )
}

export default Navbar;
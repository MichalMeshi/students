import React from 'react';
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav>
            <Link to='/'>Home </Link>
            <Link to='/register'>Register </Link>
            <Link to='/login'>Login </Link>
            <Link to='/courses-list'>Courses </Link>
        </nav>
    )
}

export default Navbar;
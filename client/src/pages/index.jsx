import React, { useEffect } from 'react';
import EntrancePage from './EntrancePage';
import { useNavigate } from 'react-router';

const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    // Use useEffect to check if the token exists
    useEffect(() => {
        if (token)
            // navigate('/personalArea')
            window.location.href = '/personalArea';

    }, []);

    return (
        <div>
            {!token && <EntrancePage />}
        </div>
    );
}

export default Home;

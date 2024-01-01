import React, { createContext, useEffect, useState } from "react";
import { fetchUser } from "../service/httpService";

const ProfileContext = createContext({});

const ProfileContextProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({});
    // const [userLoggedIn, setUserLoggedIn] = useState(false);

    const getProfileData = async () => {
        try {
            const url = `http://localhost:3000/users/get-user`
            const token = localStorage.getItem("token");
            if (token) {
                const res = await fetch(url, {
                    headers: {
                        "authorization": token
                    }
                });
                const profile = await res.json();
                console.log({profile});
                if (profile)
                    setProfileData(profile);
            }
            else {
                console.log("Please Login (from client)");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async (data) => {
        const response = await fetchUser('login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (response.status === 'fail')
            return false;
        setProfileData(response.user);
        // setUserLoggedIn(true);
        localStorage.setItem("token", response.token)
        return true;
    }
    const logout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");

        // Reset profile data (assuming you have a function to do this)
        setProfileData({});

        // Set user as not logged in
        // setUserLoggedIn(false);
    }

    const register = async (body) => {
        const response = await fetchUser('register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (response.status === 'fail')
            return false;
        setProfileData(response.newUser);
        // setUserLoggedIn(true);
        localStorage.setItem("token", response.token)
        return true;
    }
    const updateUserProfile = async (updatedData) => {
        try {
            const url = `http://localhost:3000/users/update-user`;
            const res = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
                body: JSON.stringify(updatedData)
            });
            const data = await res.json();
            if (data) {
                setProfileData(data.user); // Update the profileData in context with the updated data
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProfileData();
    }, [])


    const shared = { profileData, setProfileData, login, register, updateUserProfile, logout /*userLoggedIn,*/ }
    return (
        <ProfileContext.Provider value={shared}>
            {children}
        </ProfileContext.Provider>
    );
}

export { ProfileContextProvider }
export default ProfileContext


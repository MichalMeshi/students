import React, { createContext, useEffect, useState } from "react";
import { fetchUser } from "../service/httpService";

const ProfileContext = createContext({});

const ProfileContextProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({});

    const getProfileData = async () => {
        try {
            const url = `http://localhost:3000/users/get-user`
            const res = await fetch(url, {
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            });
            const profile = await res.json();
            if (profile)
                setProfileData(profile);
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
        console.log("response from login in context:", response);
        setProfileData(response.user);
        localStorage.setItem("token", response.token)
        return true;
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
        setProfileData(response.user);
        localStorage.setItem("token", response.token)

        return true;
    }

    useEffect(() => {
        getProfileData();
    }, [])


    const shared = { profileData, setProfileData, login, register }
    return (
        <ProfileContext.Provider value={shared}>
            {children}
        </ProfileContext.Provider>
    );
}

export { ProfileContextProvider }
export default ProfileContext


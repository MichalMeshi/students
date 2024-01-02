import React from 'react'

export default function MiniProfile(props) {
    const {userId} = props;
    const getIdDetails = async(userId)=>{
        try {
            const url = `http://localhost:3000/users/get-user-data/${userId}`
            const res = await fetch(url);
            const profile = await res.json();
            console.log({profile});

        }
    
        catch (error) {
        console.log(error.message);
    }



    }
  return (
    <div>MiniProfile: {userId}</div>
  )
}

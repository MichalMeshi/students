import React, { createContext, useEffect, useState } from "react";

const SummaryContext = createContext({});
const SummaryContextProvider = ({ children }) => {
    const [summaries, setsummaries] = useState([])
    const [summariesById, setsummariesById] = useState([])

    const [userConnectedId, setuserConnectedId] = useState('');
    const getSummaries = async (courseId) => {
        console.log({ courseId });
        const res = await fetch('http://localhost:3000/upload/' + courseId,
        {
            headers:{
                "authorization":localStorage.getItem("token")
            }
        })
        const temp = await res.json();
        console.log({temp});
        setsummaries([...temp.summeries]);
        console.log(temp.userConnectedId);
        setuserConnectedId(temp.userConnectedId);
    }
    const getSummariesbyId = async () => {
        const res = await fetch('http://localhost:3000/upload/getall' ,
        {
            headers:{
                "authorization":localStorage.getItem("token")
            }
        })
        const temp = await res.json();
        console.log({temp});
        setsummariesById(temp.summeries);
        console.log({summariesById});
        setuserConnectedId(temp.userConnectedId);
    }

    const shared = { summaries, getSummaries, setsummaries ,userConnectedId,summariesById, setsummariesById,getSummariesbyId}
    return (
        <SummaryContext.Provider value={shared}>
            {children}
        </SummaryContext.Provider>
    );


}
export { SummaryContextProvider }
export default SummaryContext

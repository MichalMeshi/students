import React, { createContext, useEffect, useState } from "react";

const SummaryContext = createContext({});
const SummaryContextProvider = ({ children }) => {
    const [summaries, setsummaries] = useState([])


    const getSummaries = async () => {
        const res = await fetch('http://localhost:3000/upload')
        const temp = await res.json()
        console.log({temp});
        setsummaries([...temp]);
        // return temp;
    }
    const shared = { summaries, getSummaries,setsummaries }
    return (
        <SummaryContext.Provider value={shared}>
            {children}
        </SummaryContext.Provider>
    );


}
export { SummaryContextProvider }
export default SummaryContext

import React, { createContext, useState } from "react";

export const TimelineContext = createContext();
const TimelineProvider = ({ children }) => {
    const [timeline, setTimeline] = useState([]);
    const addEvent = (type, name) => {
        const newEvent = {
            id: Date.now(),
            type: type,
            title: `${type} with ${name}`,
            date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            })
        };
        setTimeline([newEvent, ...timeline]);
    };
    return (
        <TimelineContext.Provider value={{ timeline, addEvent }}>
            {children}
        </TimelineContext.Provider>
    );
};

export default TimelineProvider;
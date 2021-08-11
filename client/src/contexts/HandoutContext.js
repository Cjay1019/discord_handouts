import React, { useState, createContext } from "react";

export const HandoutContext = createContext();

export const HandoutProvider = props => {
    const [handout, setHandout] = useState({
        id: "",
        name: "",
        url: "",
        hideName: false
    });

    return (
        <HandoutContext.Provider value={[handout, setHandout]}>
            {props.children}
        </HandoutContext.Provider>
    );
}
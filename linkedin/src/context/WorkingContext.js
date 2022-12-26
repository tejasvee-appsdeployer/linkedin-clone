import SearchContext from "./SearchContext";
import React, { useState } from "react";


const MyContext = (props) => {
    const [searches, setSearches] = useState("");
    return (
        <SearchContext.Provider value={{searches, setSearches}}>
            {props.children}
        </SearchContext.Provider>
    )
}


export default MyContext;
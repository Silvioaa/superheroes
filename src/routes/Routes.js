import React, { useState, useEffect } from 'react';
import PrivateRoutes from './PrivateRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

export const Validation = React.createContext();
export const Path = React.createContext();

const Routes = () => {
    const [ token, setToken ] = useState("");
    
    return(
        <Router>
            <Path.Provider value="https://www.superheroapi.com/api.php/10224262264160982/">
                <Validation.Provider value={{token, setToken}}>
                    {
                        token!==""&&localStorage.getItem("loginToken")===token
                        ?
                        <PrivateRoutes/>
                        :
                        <PublicRoutes/>
                    }
                </Validation.Provider>
            </Path.Provider>
        </Router>
    );

}

export default Routes;
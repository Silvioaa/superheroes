import React from 'react';
import PrivateRoutes from './PrivateRoutes';
import { HashRouter as Router } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import { useSelector } from 'react-redux';

export const Validation = React.createContext();
export const Path = React.createContext();

const Routes = () => {
    
    const token = useSelector(state => state.token);

    return(
        <Router>
            {
                token!==""&&localStorage.getItem("loginToken")===token
                ?
                <PrivateRoutes/>
                :
                <PublicRoutes/>
            }
        </Router>
    );

}

export default Routes;
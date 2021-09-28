import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Pages/PrivatePages/Home';
import Search from '../Pages/PrivatePages/Search';
import Details from '../Pages/PrivatePages/Details';

export const TeamState = React.createContext();

const PrivateRoutes = () => {
    const [ team, setTeam ] = useState([]);

    return(
        <TeamState.Provider value={{team, setTeam}}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/details/:id" component={Details}/>
                <Redirect to="/"/>
            </Switch>
        </TeamState.Provider>
    );
}

export default PrivateRoutes;
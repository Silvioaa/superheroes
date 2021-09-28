import React, {useContext} from "react";
import { Validation } from '../../routes/Routes';


const Logout = () => {
    const { token, setToken } = useContext(Validation);
    function handleClick(e){
        e.preventDefault();
        localStorage.setItem("loginToken","");
        setToken();
    }
    return(
        <button id="logout" onClick={handleClick}>Logout</button>
    );
}

export default Logout;
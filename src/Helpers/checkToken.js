export const checkToken = (token, setToken) => {
    if(token!==localStorage.getItem("loginToken")){
        localStorage.setItem("loginToken","");
        setToken();
      }
}
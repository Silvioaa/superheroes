export const checkToken = (dispatch, token, setToken) => {
    if(token!==localStorage.getItem("loginToken")){
        dispatch(setToken(""));
      }
}
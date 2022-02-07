import axios from "axios";
import { createCardsData } from "../Helpers/createCardsData";

export const START_QUERY = "START_QUERY";
export const END_QUERY = "END_QUERY";
export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";
export const ERASE_HERO = "ERASE_HERO";
export const SET_SEARCH = "SET_SEARCH";
export const SET_TEAM = "SET_TEAM";
export const SET_DETAIL = "SET_DETAIL";
export const SET_TEAM_AVERAGE = "SET_TEAM_AVERAGE";
export const SET_TEAM_CUMULATIVE = "SET_TEAM_CUMULATIVE";
export const SET_CUMULATIVE_ORDER = "SET_CUMULATIVE_ORDER";

export function startQuery(){
    return {
        type: START_QUERY
    }
}

export function endQuery(){
    return {
        type: END_QUERY
    }
}

export function setToken(token){
    return {
        type: SET_TOKEN,
        token: token
    }
}

export function logout(){
    return {
        type: LOGOUT
    }
}

export function eraseHero(eraseId){
    return {
        type: ERASE_HERO,
        eraseId
    }
}

export function setSearch(searchValue){
    return {
        type:SET_SEARCH,
        searchValue
    }
}

export function setTeam(teamValue){
    return {
        type: SET_TEAM,
        teamValue
    }
}

export function setDetail(detailValue){
    return {
        type: SET_DETAIL,
        detailValue
    }
}

export function setTeamAverage(teamAverage){
    return {
        type: SET_TEAM_AVERAGE,
        teamAverage
    }
}

export function setTeamCumulative(teamCumulative){
    return {
        type: SET_TEAM_CUMULATIVE,
        teamCumulative
    }
}

export function setCumulativeOrder(cumulativeOrder){
    return {
        type: SET_CUMULATIVE_ORDER,
        cumulativeOrder
    }
}



/* ---- Thunks ---- */

export const login = (loginData)=>(dispatch, getState)=>{
    dispatch(startQuery());
    axios({
        method:"post",
        url:getState().loginPath,
        data:{
            email: loginData.email,
            password: loginData.password
        }
    })
    .then((res)=>{
        dispatch(setToken(res.data.token))
    })
    .catch((err)=>{
        alert(err);
        dispatch(endQuery());
        loginData.resetForm();
    });

}

export const makeSearch = (loginData)=>(dispatch, getState)=>{
    dispatch(startQuery());
    const { heroName, resetForm } = loginData;
    axios({
        method: 'get',
        url: `${getState().path}search/${heroName}`
      })
        .then((res)=>{
          if(res.data.error){
            alert(res.data.error);
            dispatch(setSearch([]));
            resetForm();
          }else if(res.data.results!==undefined){
            let searchValue = res.data.results;
            dispatch(setSearch(searchValue));
          }
        })
        .catch((err)=>{
          alert(err);
          dispatch(endQuery())
          resetForm()
        })
}

export const getDetail = (detailId) => (dispatch, getState) => {
    dispatch(startQuery());
    axios.get(`${getState().path}${detailId}`)
    .then((res)=>{
        const detailsData = createCardsData([res.data],2,[])
        dispatch(setDetail(detailsData))
    })
    .catch((err)=>{
        alert(err);
        dispatch(endQuery())
    })
}
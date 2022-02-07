import React from 'react';
import { START_QUERY, SET_TOKEN, LOGOUT, ERASE_HERO, 
    SET_SEARCH, SET_TEAM, END_QUERY, SET_DETAIL, SET_TEAM_AVERAGE, 
    SET_TEAM_CUMULATIVE, SET_CUMULATIVE_ORDER } from './actions';

const initialState = {
    isLoading: false,
    token: undefined,
    team: [],
    search: [],
    detail: undefined,
    teamAverage:{
        altura:0,
        peso:0
    },
    teamCumulative:{
        intelligence:0,
        strength:0,
        speed:0,
        durability:0,
        power:0,
        combat:0,
    },
    cumulativeOrder:[],
    path: "https://www.superheroapi.com/api.php/10224262264160982/",
    loginPath: "https://node-api-proxy-alkemy.herokuapp.com/"
}

export const reducer = (state=initialState, action) => {
    switch(action.type){
        case START_QUERY:
            return Object.assign({},state,{isLoading:true})
        case END_QUERY:
            return Object.assign({},state,{isLoading:false})
        case SET_TOKEN:
            localStorage.setItem("loginToken",action.token)
            return Object.assign({},state, {token:action.token,isLoading:false})
        case LOGOUT:
            localStorage.setItem("loginToken","")
            return Object.assign({},state,{token:undefined})
        case ERASE_HERO:
            let teamValue = state.team;
            const eraseId = action.eraseId;
            let eraseIndex;
            teamValue.forEach((hero, index)=>{
                if(hero.id===eraseId){
                    eraseIndex = index;
                    return;
                }
            })
            teamValue.splice(eraseIndex,1);
            return Object.assign({},state,{team:teamValue})
        case SET_SEARCH:
            return Object.assign({},state,{search:action.searchValue});
        case SET_TEAM:
            return Object.assign({},state,{team:action.teamValue});
        case SET_DETAIL:
            return Object.assign({},state,{detail: action.detailValue});
        case SET_TEAM_AVERAGE:
            return Object.assign({},state,{teamAverage: action.teamAverage});
        case SET_TEAM_CUMULATIVE:
            return Object.assign({},state,{teamCumulative: action.teamCumulative});
        case SET_CUMULATIVE_ORDER:
            return Object.assign({},state,{cumulativeOrder: action.cumulativeOrder});
        default: 
            return state;
    }
}
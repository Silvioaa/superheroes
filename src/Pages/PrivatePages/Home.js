import React, { useState, useEffect, useContext } from 'react';
import { TeamState } from '../../routes/PrivateRoutes';
import { Validation } from '../../routes/Routes';
import { Link } from 'react-router-dom';
import Container from '../../Components/Container';
import NavBar from '../../Components/NavBar';
import Card from '../../Components/Card';
import Grid from '../../Components/Grid';
import TeamStats from '../../Components/TeamStats';
import { createCardsData } from '../../Helpers/createCardsData';

const Home = ({ history }) => {
  const { team, setTeam } = useContext(TeamState);
  const { token, setToken } = useContext(Validation)
  const [ stateToForceReRender, setStateToForceReRender ] = useState(0);
  const [ cumulativeOrder, setCumulativeOrder ] = useState([]);
  const [ teamCumulative, setTeamCumulative ] = useState({
    inteligencia:0,
    fuerza:0,
    velocidad:0,
    durabilidad:0,
    poder:0,
    combate:0,
    peso:0,
    altura:0
  })

  function handleClick(e){
    e.preventDefault();
    let teamValue = team;
    let heroIndex;
    teamValue.forEach((hero, index)=>{
      if(hero.id===e.target.id){
        heroIndex = index;
        return;
      }
    })
    teamValue.splice(heroIndex,1);
    setTeam(teamValue);
    setStateToForceReRender((prevState)=>++prevState);
  }

  const teamCardButtons = [
    {
      name:"Ver Detalle",
      linkOrFunction:"/details/"
    },
    {
      name:"Eliminar",
      linkOrFunction: handleClick
    }
  ]
  
  useEffect(() => {
      let teamCumulativeValue = {
        inteligencia:0,
        fuerza:0,
        velocidad:0,
        durabilidad:0,
        poder:0,
        combate:0,
        peso:0,
        altura:0
      };
      let averageHeight = 0, averageWeight = 0;
      team.forEach((hero)=>{
        teamCumulativeValue.inteligencia = !isNaN(parseInt(hero.powerstats.intelligence))?
          teamCumulativeValue.inteligencia+parseInt(hero.powerstats.intelligence):teamCumulativeValue.inteligencia;
        teamCumulativeValue.fuerza = !isNaN(parseInt(hero.powerstats.strength))?
          teamCumulativeValue.fuerza+parseInt(hero.powerstats.strength):teamCumulativeValue.fuerza;
        teamCumulativeValue.velocidad = !isNaN(parseInt(hero.powerstats.speed))?
          teamCumulativeValue.velocidad+parseInt(hero.powerstats.speed):teamCumulativeValue.velocidad;
        teamCumulativeValue.durabilidad = !isNaN(parseInt(hero.powerstats.durability))?
          teamCumulativeValue.durabilidad+parseInt(hero.powerstats.durability):teamCumulativeValue.durabilidad;
        teamCumulativeValue.poder = !isNaN(parseInt(hero.powerstats.power))?
          teamCumulativeValue.poder+parseInt(hero.powerstats.power):teamCumulativeValue.poder;
        teamCumulativeValue.combate = !isNaN(parseInt(hero.powerstats.combat))?
          teamCumulativeValue.combate+parseInt(hero.powerstats.combat):teamCumulativeValue.combate;
        if(hero.appearance.height[1].slice(-3)===" cm"){
          let heroHeight = hero.appearance.height[1].split(" ");
          heroHeight = parseInt(heroHeight[0]);
          averageHeight += heroHeight;
        }
        if(hero.appearance.weight[1].slice(-3)===" kg"){
          let heroWeight = hero.appearance.weight[1].split(" ");
          heroWeight = parseInt(heroWeight[0]);
          averageWeight += heroWeight;
        }
      })
      averageHeight=team.length===0?0:averageHeight/team.length;
      averageWeight=team.length===0?0:averageWeight/team.length;
      teamCumulativeValue.altura=averageHeight;
      teamCumulativeValue.peso=averageWeight;

      let cumulativeOrderValue = Object.entries(teamCumulativeValue);
      let maximumValue = 0;
      let maximumIndex;
      cumulativeOrderValue.map((variable, index)=>{
        if(variable[0]==="peso"||variable[0]==="altura"){
          return;
        }else{ 
          if(variable[1]>maximumValue){
            maximumValue = variable[1];
            maximumIndex = index;
          }
        }
      })
      const firstElement = cumulativeOrderValue.splice(maximumIndex,1);
      cumulativeOrderValue.unshift(firstElement[0]);
      setTeamCumulative(teamCumulativeValue);
      setCumulativeOrder(cumulativeOrderValue);
  },[stateToForceReRender])

  useEffect(() => {
    if(token!==localStorage.getItem("loginToken")){
      localStorage.setItem("loginToken","");
      setToken();
    }
  })

  return (
    <>
      <NavBar/>
      <Container>
        
        <h1 className="display-1 text-primary">EQUIPO</h1>
        
        
        <TeamStats
          cumulativeOrder={cumulativeOrder}
          teamCumulative={teamCumulative}
        />
        
          {
            team.length===0
          ?
          <div>No hay miembros en el equipo todavía.</div>
          :
          <Grid
            items={team}
            columns={2}
            type={1}
            buttons={teamCardButtons}
            history={history}
          />
          }
          
      </Container>
    </>  
  );
}

export default Home;
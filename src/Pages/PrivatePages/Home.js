import React, { useState, useEffect, useContext } from 'react';
import { TeamState } from '../../routes/PrivateRoutes';
import { Validation } from '../../routes/Routes';
import { Link } from 'react-router-dom';
import Logout from './Logout';

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

  async function handleClick(e){
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
    await setTeam(teamValue);
    setStateToForceReRender((prevState)=>++prevState);
  }
  
  useEffect(() => {
    console.log(teamCumulative)
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
      console.log(teamCumulativeValue);

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
      console.log(firstElement)
      cumulativeOrderValue.unshift(firstElement[0]);
      console.log(cumulativeOrderValue)
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
      <div className="container">
        <Logout/>
        
        <h1>EQUIPO</h1>
        <Link to="/search">Ir a búsqueda</Link>
        <div id="cumulative" className="container">
          <div>
            <h2>ACUMULATIVO</h2>

            {cumulativeOrder.length!==0&&
            cumulativeOrder.map((cumulative)=>{
              if(cumulative[0]==="altura"||cumulative[0]==="peso"){
                return
              }
              return(<span><b>{cumulative[0]}:</b> {cumulative[1]}</span>)
            })}

            {/* <span><b>Inteligencia:</b> {teamCumulative.intelligence}</span>
            <span><b>Fuerza:</b> {teamCumulative.strength}</span>
            <span><b>Velocidad:</b> {teamCumulative.speed}</span>
            <span><b>Durabilidad:</b> {teamCumulative.durability}</span>
            <span><b>Poder:</b> {teamCumulative.power}</span>
            <span><b>Combate:</b> {teamCumulative.combat}</span> */}

            <h3>PROMEDIOS</h3>
            <span><b>Altura:</b> {teamCumulative.altura}</span>
            <span><b>Peso:</b> {teamCumulative.peso}</span>
          </div>
        </div>
        
        
          {
            team.length===0
          ?
          <div>No hay miembros en el equipo todavía.</div>
          :
            <div id="team" className="container">
              <div className="row">{
                team.map((hero)=>
                  <div className="col-6">
                    <img src={hero.image.url}/>
                    <h1>{hero.name}</h1>
                    <div>
                    <Link to={`/details/${hero.id}`}>Ver Detalle</Link>
                    <a id={hero.id} href="" onClick={handleClick}>Eliminar</a>
                    </div>
                    <span><b>Inteligencia:</b> {hero.powerstats.intelligence}</span>
                    <span><b>Fuerza:</b> {hero.powerstats.strength}</span>
                    <span><b>Velocidad:</b> {hero.powerstats.speed}</span>
                    <span><b>Durabilidad:</b> {hero.powerstats.durability}</span>
                    <span><b>Poder:</b> {hero.powerstats.power}</span>
                    <span><b>Combate:</b> {hero.powerstats.combat}</span>
                  </div>
                )
              }
              </div>
            </div>
          }
          
      </div>   
    </>
  );
}

export default Home;
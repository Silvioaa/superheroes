import React, { useState, useEffect, useContext } from 'react';
import { TeamState } from '../../routes/PrivateRoutes';
import { Validation } from '../../routes/Routes';
import Container from '../../Components/Container';
import NavBar from '../../Components/NavBar';
import Grid from '../../Components/Grid';
import TeamStats from '../../Components/TeamStats';
import { checkToken } from '../../Helpers/checkToken';

const Home = ({ history }) => {
  const { team, setTeam } = useContext(TeamState);
  const { token, setToken } = useContext(Validation)
  const [ stateToForceReRender, setStateToForceReRender ] = useState(0);

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
    checkToken(token, setToken)
  })

  return (
    <>
      <NavBar
        section={"home"}
      />
      <Container>
        
        <h1 className="display-1 text-primary m-3">EQUIPO</h1>
        
        <TeamStats
          stateToForceReRender={stateToForceReRender}
        />
        
        {
          team.length===0
          ?
          <div>No hay miembros en el equipo todavía.</div>
          :
          <Grid
            items={team}
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
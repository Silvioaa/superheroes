import React, { useState, useEffect } from 'react';
import Container from '../../Components/Container';
import NavBar from '../../Components/NavBar';
import Grid from '../../Components/Grid';
import TeamStats from '../../Components/TeamStats';
import { checkToken } from '../../Helpers/checkToken';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, eraseHero } from '../../redux/actions';

const Home = ({ history }) => {

  const token = useSelector(state => state.token);
  const team = useSelector(state => state.team);
  const dispatch = useDispatch()
  const [ stateToForceReRender, setStateToForceReRender ] = useState(0);

  function handleClick(e){
    e.preventDefault();
    dispatch(eraseHero(e.target.id))
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
    checkToken(dispatch, token, setToken)
  },[])

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
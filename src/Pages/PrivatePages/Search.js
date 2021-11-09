import React, { useContext, useEffect, useState } from 'react';
import { TeamState, SearchState } from '../../routes/PrivateRoutes';
import { Path, Validation } from '../../routes/Routes';
import Container from '../../Components/Container';
import NavBar from '../../Components/NavBar';
import Grid from '../../Components/Grid';
import FormComponent from '../../Components/FormComponent';
import { checkToken } from '../../Helpers/checkToken';
import { filterNewHero } from '../../Helpers/filterNewHero';
import axios from 'axios';

const Search = ({ history }) => {

    const { team, setTeam } = useContext(TeamState);
    const { token, setToken } = useContext(Validation);
    const { search, setSearch } = useContext(SearchState);
    const path = useContext(Path);
    
    const initialValues={
      heroName: ""
    }

    function submitFunction(values,{resetForm}){
      axios({
        method: 'get',
        url: `${path}search/${values.heroName}`
      })
        .then((res)=>{
          if(res.data.error){
            alert(res.data.error);
            setSearch([]);
            resetForm();
          }else if(res.data.results!==undefined){
            let searchValue = res.data.results;
            setSearch(searchValue);
          }
        })
        .catch((err)=>{
          alert(err);
          resetForm()
        })
    }

    function validateFunction(values){
      let errors = {}
      if(!values.heroName){
        errors.heroName = "Por favor ingresar un nombre de personaje para buscar."
      }
      return errors;
    }

      const searchButtons = [
        {
          name:"Agregar al Equipo",
          linkOrFunction:handleClick
        }
      ];

      function handleClick(e){
        filterNewHero(e, team, setTeam, search, setSearch);
      }

      useEffect(() => {
        checkToken(token, setToken)
      })

    return(
      <>
        <NavBar
          section="search"
        />
        <Container>
          <h1 className="display-1 text-primary m-3">BUSCADOR</h1>
          
          <FormComponent
            initialValues={initialValues}
            submitFunction={submitFunction}
            validateFunction={validateFunction}
            submit={"Buscar"}
          />
          {
            search.length!==0&&

            <Grid
              items={search}
              type={0}
              buttons={searchButtons}
              history={history}
              search={true}
            />
          }
        </Container>
      </>
    );
}

export default Search;
import React, { useEffect } from 'react';
import Container from '../../Components/Container';
import NavBar from '../../Components/NavBar';
import Grid from '../../Components/Grid';
import FormComponent from '../../Components/FormComponent';
import { checkToken } from '../../Helpers/checkToken';
import { filterNewHero } from '../../Helpers/filterNewHero';
import { useSelector, useDispatch } from 'react-redux';
import { makeSearch, setTeam, setSearch, setToken } from '../../redux/actions';

const Search = ({ history }) => {

    const team = useSelector(state => state.team);
    const token = useSelector(state => state.token);
    const search = useSelector (state => state.search);

    const dispatch = useDispatch();
    
    const initialValues={
      heroName: ""
    }

    function submitFunction(values,{resetForm}){
      const searchData = {
        heroName: values.heroName,
        resetForm
      }
      dispatch(makeSearch(searchData))
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
        e.preventDefault()
        filterNewHero(e.target.id, dispatch, team, setTeam, search, setSearch);
      }

      useEffect(() => {
        checkToken(dispatch, token, setToken)
      },[])

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
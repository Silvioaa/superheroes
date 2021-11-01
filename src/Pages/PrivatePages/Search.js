import React, { useContext, useState, useEffect } from 'react';
import { TeamState } from '../../routes/PrivateRoutes';
import { Path, Validation } from '../../routes/Routes';
import { Link } from 'react-router-dom';
import Container from '../../Components/Container';
import NavBar from '../../Components/NavBar';
import Grid from '../../Components/Grid';
import axios from 'axios';
import { Formik, ErrorMessage, Field, Form } from 'formik';

const Search = ({ history }) => {

    const { team, setTeam } = useContext(TeamState);
    const { token, setToken } = useContext(Validation)
    const path = useContext(Path);
    const [ searchResult, setSearchResult ] = useState([])

    function handleClick(e){
      e.preventDefault();
      if(team.length===0||team.filter((hero)=>hero.id===e.target.id).length===0){
        if(team.length<6){
          let heroValue = searchResult.filter((hero)=>{
            if(hero.id===e.target.id){
              return true;
            }
        });
        if((team.filter((hero)=>hero.biography.alignment==="bad").length<3&&heroValue[0].biography.alignment==="bad")||
        (team.filter((hero)=>hero.biography.alignment==="good").length<3&&heroValue[0].biography.alignment==="good")){
          let searchResultValue = searchResult;
          searchResultValue = searchResultValue.filter((hero)=>{
            if(hero.id!==e.target.id){
              return true;
            }
          })
          setTeam([...team,heroValue[0]]);
          setSearchResult(searchResultValue);
        }else if(heroValue[0].biography.alignment!=="good"&&heroValue[0].biography.alignment!=="bad"){
          alert("En el equipo solamente pueden agregarse personajes que sean buenos o malos.");
        }else{
          alert("En el equipo solamente pueden agregarse hasta tres miembros buenos y hasta tres miembros malos. Estás agregando uno de más.");
        }
      }else{
        alert("El equipo puede tener hasta 6 miembros");
      }

      }else{
        alert("Este superhéroe ya está agregado al equipo.")
      }
  
    }

      const searchButtons = [
        {
          name:"Agregar al Equipo",
          linkOrFunction:handleClick
        }
      ];

      useEffect(() => {
        if(token!==localStorage.getItem("loginToken")){
          localStorage.setItem("loginToken","");
          setToken();
        }
      })

    return(
      <>
        <NavBar/>
        <Container>
          <h1 className="display-1 text-primary m-3">BUSCADOR</h1>
          
          <Formik
            initialValues={{
              heroName: ""
            }}
            onSubmit={(values,{resetForm})=>{
              axios({
                method: 'get',
                url: `${path}search/${values.heroName}`
              })
                .then((res)=>{
                  console.log(res.data)
                  if(res.data.error){
                    alert(res.data.error);
                    setSearchResult([]);
                    resetForm();
                  }else if(res.data.results!==undefined){
                    let searchResultValue = res.data.results;
                    setSearchResult(searchResultValue);
                  }
                })
                .catch((err)=>{
                  alert(err);
                  resetForm()
                })
            }}
            validate={(values)=>{
              let errors = {}
              if(!values.heroName){
                errors.heroName = "Por favor ingresar un nombre de personaje para buscar."
              }
              return errors;
            }}
          >
            {({errors})=>(
              <Form className="d-flex flex-column">
                <div>
                  <Field className="form-control" name="heroName" type="text" placeholder="Ingresa un nombre para buscar"/>
                </div>
                <div className="error">
                  <ErrorMessage name="heroName" component={()=><span className="text-danger">{errors.heroName}</span>}/>
                </div>
                <input className="btn btn-primary mt-3 mb-5" type="submit" value="Buscar"/>
              </Form>
            )}
            
          </Formik>
        {
          searchResult.length!==0&&

          <Grid
            items={searchResult}
            columns={3}
            type={0}
            buttons={searchButtons}
            history={history}
          />
        }

        </Container>
      </>
    );
}

export default Search;
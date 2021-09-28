import React, { useContext, useState, useEffect } from 'react';
import { TeamState } from '../../routes/PrivateRoutes';
import { Path, Validation } from '../../routes/Routes';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import Logout from './Logout';

const Search = () => {

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

      useEffect(() => {
        if(token!==localStorage.getItem("loginToken")){
          localStorage.setItem("loginToken","");
          setToken();
        }
      })

    return(
        <>
        <div id="search" className="container">
          <Logout/>
          <h1>BUSCADOR</h1>
          <Link to="/">Volver a Home</Link>
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
              <Form>
                <div>
                  <Field name="heroName" type="text" placeholder="Ingresa un nombre para buscar"/>
                </div>
                <div className="error">
                  <ErrorMessage name="heroName" component={()=><span className="text-danger">{errors.heroName}</span>}/>
                </div>
                <input type="submit" value="Buscar"/>
              </Form>
            )}
            
          </Formik>
        </div>
        <div className="container">
          <div className="row">
            {
              searchResult.length !==0 &&
              searchResult.map((result)=>
                <div className="col-4">
                  <img src={result.image.url}/>
                  <span>{result.name}</span>
                  <button id={result.id} onClick={handleClick}>Agregar al equipo</button>
                </div>
              )
            }
          </div>
        </div>
        </>
    );
}

export default Search;
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Path, Validation } from '../../routes/Routes';
import axios from 'axios';
import Logout from './Logout';

const Details = ({match}) => {

    const [ hero, setHero ] = useState();
    const path = useContext(Path)
    const { token, setToken } = useContext(Validation)

useEffect(() => {
    if(hero===undefined||hero===null){
        axios.get(`${path}${match.params.id}`)
        .then((res)=>{
            console.log(res.data)
            setHero(res.data)
        })
    }
    

})

useEffect(() => {
    if(token!==localStorage.getItem("loginToken")){
      localStorage.setItem("loginToken","");
      setToken();
    }
  })
    

    return(
        <>  
        <div id="detailContainer" className="container">
            <Logout/>
            {
                hero!==null&&hero!==undefined?
                                
                <div className="detail">
                    <div>
                        <h1>{hero.name}</h1>
                        <Link to="/">Volver a Home</Link>
                        <img src={hero.image.url}/>
                        <span><b>Peso:</b> {hero.appearance.weight[0] + " / "+hero.appearance.weight[1]}</span>
                        <span><b>Altura:</b> {hero.appearance.height[0] + " / " +hero.appearance.height[1]}</span>
                        <span><b>Alias:</b> {hero.biography.aliases.map((alias, index)=>{
                            if(index<hero.biography.aliases.length-1){
                                return alias + ", ";
                            }else{
                                return alias + "."
                            }
                            })}</span>
                        <span><b>Color de ojos:</b> {hero.appearance["eye-color"]}</span>
                        <span><b>Color de cabello:</b> {hero.appearance["hair-color"]}</span>
                        <span><b>Lugar de trabajo:</b> {hero.work.base}</span>
                    </div>
                </div>
                :
                ""
            }
        </div>
        </>
    );

}

export default Details;
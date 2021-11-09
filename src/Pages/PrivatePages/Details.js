import React, { useEffect, useState, useContext } from 'react';
import { Path, Validation } from '../../routes/Routes';
import Container from '../../Components/Container';
import NavBar from '../../Components/NavBar';
import Card from '../../Components/Card';
import { createCardsData } from '../../Helpers/createCardsData';
import { checkToken } from '../../Helpers/checkToken';
import axios from 'axios';

const Details = ({match}) => {

    const [ hero, setHero ] = useState();
    const path = useContext(Path)
    const { token, setToken } = useContext(Validation)

    

    useEffect(() => {
        if(hero===undefined||hero===null){
            axios.get(`${path}${match.params.id}`)
            .then((res)=>{
                const detailsData = createCardsData([res.data],2,[])
                setHero(detailsData)
            })
        }
    })

    useEffect(() => {
        checkToken(token, setToken)
    })
    

    return(
        <>
            <NavBar/>
            <Container>
                <div className="mt-5 d-flex justify-content-center align-items-center">
                    {
                        hero!==null&&hero!==undefined?
    
                        hero.items.map((heroItem, index)=>
                            <Card
                                key={index}
                                id={heroItem.id}
                                photo={heroItem.image.url}
                                title={heroItem.name}
                                fields={hero.fields[index]}
                                details={true}
                            />
                        )
                        :
                        ""   
                    }
                </div>
            </Container>
        </>
    );
}

export default Details;
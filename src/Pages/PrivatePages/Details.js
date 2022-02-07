import React, { useEffect, useState, useContext } from 'react';
import { Path, Validation } from '../../routes/Routes';
import Container from '../../Components/Container';
import NavBar from '../../Components/NavBar';
import Card from '../../Components/Card';
import { createCardsData } from '../../Helpers/createCardsData';
import { checkToken } from '../../Helpers/checkToken';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail, setToken, setDetail } from '../../redux/actions';

const Details = ({match}) => {

    const detail = useSelector(state => state.detail);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const id = match.params.id

    useEffect(() => {
        if(detail===undefined||detail===null||detail.items[0].id!==id){
            dispatch(getDetail(id))
        }
    })
    

    useEffect(() => {
        checkToken(dispatch, token, setToken)
    })
    

    return(
        <>
            <NavBar/>
            <Container>
                <div className="mt-5 d-flex justify-content-center align-items-center">
                    {
                        detail!==null&&detail!==undefined&&
                        detail.items[0].id===id?
                        
                        detail.items.map((detailItem, index)=>
                            <Card
                                key={index}
                                id={detailItem.id}
                                photo={detailItem.image.url}
                                title={detailItem.name}
                                fields={detail.fields[index]}
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
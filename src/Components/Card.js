import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
    id,
    photo,
    title,
    fields,
    buttons=[],
    history
}) => {

    return(
        <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
                <div className="card-body text-center p-3">
                    <img className="card-img-top" src={photo}/>
                    <h1 className="display-6 text-primary">{title}</h1>
                    {
                        fields.map((field)=>{
                            return <div className="display-8"><b>{field[0]}</b><span>{field[1]}</span></div>
                        })
                    }
                    {
                        buttons.length!==0 && buttons.map((button)=>{
                            console.log(button) 
                            if(typeof button.linkOrFunction==="string"){
                                return <a className="btn btn-outline-primary m-2" onClick={()=>history.push(`${button.linkOrFunction+id}`)}>{button.name}</a>
                            }else{ 
                                return <a className="btn btn-outline-primary m-2" id={id} onClick={button.linkOrFunction}>{button.name}</a>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Card;
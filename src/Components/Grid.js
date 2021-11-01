import React from 'react';
import Card from './Card';
import { createCardsData } from '../Helpers/createCardsData';

const Grid = ({
    items, 
    columns, 
    type, 
    buttons, 
    history
}) => {

    const cardsData = createCardsData(items,type,buttons)

    let cardsItems = cardsData.items.map((item,index)=>{
        return (
            <Card
                id={item.id}
                photo={item.image.url}
                title={item.name}
                fields={cardsData.fields[index]}
                buttons={buttons}
                history={history}
            />
        );
    })

    let rowsArray = [];
    const loopLength = Math.ceil(cardsItems.length/columns);

    for(let i=0;i<loopLength;++i){
        if(cardsItems.length!==0)rowsArray.push(cardsItems.splice(0,3))
    }

    const testArray = ["a","b","c","d"]
    console.log(rowsArray)
    
    return (
        <div className="container w-75">
            {
                /* rowsArray.map((row)=>
                    row
                ) */
                rowsArray.map( (row) =>{
                    return( <div className="row">
                        {
                            row.map( (col) =>{
                                return (<>{col}</>)
                            })
                        }
                    </div>)
                })
            }
        </div>
    );
}

export default Grid;
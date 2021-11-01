import React from 'react';

const TeamStats = ({
    cumulativeOrder,
    teamCumulative
}) => {
    return(
        <div id="cumulative" className="container d-flex justify-content-center">
            <div className="d-flex flex-column bg-primary p-3 m-3 align-items-center rounded">
                <h2 className="text-white">ACUMULATIVO</h2>

                {cumulativeOrder.length!==0&&
                cumulativeOrder.map((cumulative)=>{
                    if(cumulative[0]==="altura"||cumulative[0]==="peso"){
                        return
                    }
                    return(<span className="text-white"><b>{cumulative[0]}:</b> {cumulative[1]}</span>)
                })}
                <h3 className="text-white">PROMEDIOS</h3>
                <span className="text-white"><b>Altura:</b> {teamCumulative.altura}</span>
                <span className="text-white"><b>Peso:</b> {teamCumulative.peso}</span>
            </div>
        </div>
    );
}

export default TeamStats;
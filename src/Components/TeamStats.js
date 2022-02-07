import React, { useEffect } from 'react';
import { translate } from '../Helpers/translate';
import { getStats } from '../Helpers/getStats';
import { useSelector, useDispatch } from 'react-redux';
import { setTeamAverage, setTeamCumulative, setCumulativeOrder } from '../redux/actions';

const TeamStats = ({
    stateToForceReRender
}) => {

    const teamAverage = useSelector(state => state.teamAverage);
    const cumulativeOrder = useSelector(state => state.cumulativeOrder);
    const team = useSelector(state => state.team);
    const dispatch = useDispatch();

    useEffect(() => {
        const {teamCumulativeValue, cumulativeOrderValue, teamAverageValue} = getStats(team)
        dispatch(setTeamCumulative(teamCumulativeValue));
        dispatch(setCumulativeOrder(cumulativeOrderValue));
        dispatch(setTeamAverage(teamAverageValue));
    },[stateToForceReRender])

    return(
        <div id="cumulative" className="d-flex justify-content-center">
            <div className="border border-primary d-flex flex-wrap p-3 m-3 align-items-start rounded">
                <div className="d-flex flex-column me-5 mb-3">
                    <h3 className="text-primary">ACUMULATIVO</h3>

                    {cumulativeOrder.length!==0&&
                    cumulativeOrder.map((cumulative, index)=>{
                        return(
                          <span key={index} className="text-secondary">
                            <b className="text-capitalize">{translate(cumulative[0])}:</b> {cumulative[1]}
                          </span>)
                    })}
                </div>
                <div className="d-flex flex-column">
                    <h3 className="text-primary">PROMEDIOS</h3>
                    <span className="text-secondary"><b>Altura:</b> {teamAverage.altura.toFixed(2)} cm</span>
                    <span className="text-secondary"><b>Peso:</b> {teamAverage.peso.toFixed(2)} kg</span>
                </div>
            </div>
        </div>
    );
}

export default TeamStats;
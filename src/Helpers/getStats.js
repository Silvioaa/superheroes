export function getStats(team){
    let teamCumulativeValue = {
        intelligence:0,
        strength:0,
        speed:0,
        durability:0,
        power:0,
        combat:0,
      };
      let teamAverageValue = {
        altura:0,
        peso:0
      };
      let averageHeight = 0; 
      let averageWeight = 0;

      team.forEach((hero)=>{

        Object.keys(teamCumulativeValue).forEach((property)=>{
          teamCumulativeValue[property] = isNaN(parseInt(hero.powerstats[property]))?
          teamCumulativeValue[property]:
          teamCumulativeValue[property]+parseInt(hero.powerstats[property])
      })
          
        if(hero.appearance.height[1].slice(-3)===" cm"){
          let heroHeight = hero.appearance.height[1].split(" ");
          heroHeight = parseInt(heroHeight[0]);
          averageHeight += heroHeight;
        }

        if(hero.appearance.weight[1].slice(-3)===" kg"){
          let heroWeight = hero.appearance.weight[1].split(" ");
          heroWeight = parseInt(heroWeight[0]);
          averageWeight += heroWeight;
        }
      })

      averageHeight=team.length===0?0:averageHeight/team.length;
      averageWeight=team.length===0?0:averageWeight/team.length;
      teamAverageValue.altura=averageHeight;
      teamAverageValue.peso=averageWeight;
      

      let cumulativeOrderValue = Object.entries(teamCumulativeValue);
      let maximumValue = 0;
      let maximumIndex;

      cumulativeOrderValue.map((variable, index)=>{
        if(variable[1]>maximumValue){
          maximumValue = variable[1];
          maximumIndex = index;
        }
      })

      const firstElement = cumulativeOrderValue.splice(maximumIndex,1);
      cumulativeOrderValue.unshift(firstElement[0]);

      return {
          teamCumulativeValue,
          cumulativeOrderValue,
          teamAverageValue
      }
}
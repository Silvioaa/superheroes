import Card from '../Components/Card'

export const createCardsData = (items, type, buttons) => {
    let fieldsValue = [];
    items.forEach((item)=>{
        if(type===0){
            fieldsValue.push([]);
        }else if(type===1){
            fieldsValue.push([
                ["Inteligencia:", item.powerstats.intelligence],
                ["Fuerza:",item.powerstats.strength],
                ["Velocidad:",item.powerstats.speed],
                ["Durabilidad:",item.powerstats.durability],
                ["Poder:",item.powerstats.power],
                ["Combate:",item.powerstats.combat]
            ]);
        }else if(type===2){
            fieldsValue.push([
                ["Peso:",item.appearance.weight[0] + " / "+item.appearance.weight[1]],
                ["Altura:",item.appearance.height[0] + " / " +item.appearance.height[1]],
                ["Alias:",item.biography.aliases.map((alias, index)=>{
                    if(index<item.biography.aliases.length-1){
                        return alias + ", ";
                    }else{
                        return alias + "."
                    }
                    })],
                ["Color de Ojos:",item.appearance["eye-color"]],
                ["Color de Cabello:",item.appearance["hair-color"]],
                ["Lugar de trabajo:",item.work.base]
            ]);
        }
    })
    
    return {
        items:items,
        fields:fieldsValue
    };

} 
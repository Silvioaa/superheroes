export const filterNewHero = (
    e,
    team,
    setTeam,
    search,
    setSearch
) => {
    e.preventDefault();
    if(team.filter((hero)=>hero.id===e.target.id).length===0){
      if(team.length<6){
        let heroValue = search.filter((hero)=>hero.id===e.target.id);
        heroValue = heroValue[0];
        if((team.filter((hero)=>hero.biography.alignment==="bad").length<3&&heroValue.biography.alignment==="bad")||
           (team.filter((hero)=>hero.biography.alignment==="good").length<3&&heroValue.biography.alignment==="good")){
            let searchValue = search;
            searchValue = searchValue.filter((hero)=>hero.id!==e.target.id);
            setTeam([...team,heroValue]);
            setSearch(searchValue);
        }else if(heroValue.biography.alignment!=="good"&&heroValue.biography.alignment!=="bad"){
            alert("En el equipo solamente pueden agregarse personajes que sean buenos o malos.");
        }else{
            alert("En el equipo solamente pueden agregarse hasta tres miembros buenos y hasta tres miembros malos. Estás agregando uno de más.");
        }
      }else{
        alert("El equipo puede tener hasta 6 miembros");
      }
    }else{
      alert("Este superhéroe ya está agregado al equipo.");
    }

}
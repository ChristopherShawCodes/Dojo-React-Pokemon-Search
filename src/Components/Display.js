import React,{useState, useEffect} from 'react'
import Axios from 'axios'
import '../App.css'

const Display = () => {
    const [pokemonName, setPokemonName] = useState("")
    const [pokemonChosen, setPokemonChosen] = useState(false)
    const [pokemon, setPokemon] = useState({
        name: "", 
        species: "", 
        img: "", 
        hp: "",
        attack: "",
        defense: "",
        type: "",
        ability1:"",
        ability2:""

});


    const searchPokemon = ()=>{
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
            setPokemon({
                name: pokemonName, 
                img: response.data.sprites.front_default, 
                hp: response.data.stats[0].base_stat,
                attack: response.data.stats[1].base_stat,
                defense: response.data.stats[2].base_stat,
                type: response.data.types[0].type.name,
                ability1: response.data.abilities[0].ability.name,
                ability2: response.data.abilities[1].ability.name
            })
            setPokemonChosen(true);
            console.log(response)
        })
    }



    return (
    <div className='title'>
    <h1>Pokemon Search</h1>
    <p>Built for the Coding Dojo homework assignment</p>
        <input type="text" onChange={(event)=>{
            setPokemonName(event.target.value);
        }}></input>
        <button onClick={searchPokemon}>Search Pokemon</button>
        <div className='container'>
        {!pokemonChosen ? (
            <h1>please choose a pokemon</h1>
            ):(
                <>
                <div className='cardTitle'>
                <h1>{pokemon.name}</h1>
                <img src={pokemon.img}/>
                </div>
                <div className='left'>
                <h4>Type</h4>
                <p>{pokemon.type}</p>
                <h4>Health</h4>
                <p>{pokemon.hp}</p>
                </div>
                <div className='right'>
                <h4>Attack</h4>
                <p>{pokemon.attack}</p>
                <h4>Defense</h4>
                <p>{pokemon.defense}</p>
                </div>
                <div className='abilities'>
                <h4>Abilities</h4>
                <p>{pokemon.ability1}</p>
                <p>{pokemon.ability2}</p>
                </div>
                </>
                )}
        </div>
    </div>
    )
}

export default Display
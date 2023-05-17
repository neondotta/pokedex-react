import { useContextSelector } from "use-context-selector";
import { CardsContainer, ListPokemonsContainer, TypePokemonBlock } from "./styles";

import PokeballSVG from '../../../../assets/pokeball.svg'

import { PokemonsContext } from '../../../../context/PokemonsContext';
import { NavLink } from "react-router-dom";

export function ListPokemons() {
    const pokemons = useContextSelector(
        PokemonsContext,
        (context) => {
            return context.pokemons
        },
    )

    return(
        <ListPokemonsContainer>
            {pokemons.map((pokemon) => {
                return <CardsContainer type={pokemon.types[0].name} key={pokemon.id}>
                    <NavLink to={`/pokemon/${pokemon.name.toLowerCase()}`}>
                        <header>
                            <img className="pokemon-image" src={ pokemon.images.default } alt="" />
                            <img src={PokeballSVG} className="background-image" alt="" />
                        </header>
                        <main>
                            <p className="number">#{pokemon.number}</p>
                            <p className="name">{pokemon.name}</p>
                            <div className="types">
                                {pokemon.types.map((type) => {
                                    return <TypePokemonBlock key={type.name} type={type.name}>
                                        {type.name}
                                    </TypePokemonBlock>
                                })}                            
                            </div>
                        </main>
                    </NavLink>
                </CardsContainer>
            })}
        </ListPokemonsContainer> 
    )
}
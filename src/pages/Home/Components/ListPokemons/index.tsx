import { useContextSelector } from "use-context-selector";
import ReactLoading from 'react-loading';
import { CardsContainer, ContainerButtonMorePokemon, ListPokemonsContainer, TypePokemonBlock } from "./styles";

import PokeballSVG from '../../../../assets/pokeball.svg'

import { PokemonsContext } from '../../../../context/PokemonsContext';
import { NavLink } from "react-router-dom";

export function ListPokemons() {
    const { pokemons, isLoading, fetchPokemons, nextUrl } = useContextSelector(
        PokemonsContext,
        (context) => {
            return context
        },
    )
    
    return(
        <>
            <ListPokemonsContainer>
                {isLoading ?? (
                    <ReactLoading type='spinningBubbles' color='#30a7d7' height={667} width={375} />
                )}
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
                                    {pokemon.types.map((currentType) => {
                                        return <TypePokemonBlock key={currentType.name} type={currentType.name}>
                                            {currentType.name}
                                        </TypePokemonBlock>
                                    })}                            
                                </div>
                            </main>
                        </NavLink>
                    </CardsContainer>
                })}
            </ListPokemonsContainer>
            
            <ContainerButtonMorePokemon>
                <button onClick={() => fetchPokemons(nextUrl)}> Buscar mais Pokémons</button>
            </ContainerButtonMorePokemon>
        </>
    )
}
import { useContextSelector } from "use-context-selector";
import { CardsContainer, ContainerButtonMorePokemon, ErrorMessage, ListPokemonsContainer, TypePokemonBlock } from "./styles";

import PokeballSVG from '../../../../assets/pokeball.svg'

import { PokemonsContext } from '../../../../context/PokemonsContext';
import { NavLink } from "react-router-dom";
import { Loader } from "../../../../components/Loader";

export function ListPokemons() {
    const { pokemons, isLoading, fetchPokemons, nextUrl } = useContextSelector(
        PokemonsContext,
        (context) => {
            return context
        },
    )
    return(
        <>
            {isLoading && (
                <Loader type='spinningBubbles' isLoading={isLoading} />
            )}

            {pokemons.length > 0 ? (
                <>
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
            ) : (
                <ErrorMessage>Não foi encontrado nenhum pokémon</ErrorMessage>
            )}
        </>
    )
}
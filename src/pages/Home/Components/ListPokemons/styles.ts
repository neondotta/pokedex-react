import styled from "styled-components";

export const ListPokemonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  margin: 0 auto;
  max-width: 64rem;
  padding: 20px;
  width: 64rem;
  flex-wrap: wrap;
`;

const typesPokemon = {
  normal: "normal",
  fire: "fire",
  water: "water",
  electric: "electric",
  grass: "grass",
  ice: "ice",
  fighting: "fighting",
  poison: "poison",
  ground: "ground",
  flying: "flying",
  psychic: "psychic",
  bug: "bug",
  rock: "rock",
  ghost: "ghost",
  dragon: "dragon",
  dark: "dark",
  steel: "steel",
  fairy: "fairy",
};

interface CardsPokemonProps {
  type: keyof typeof typesPokemon;
}

export const CardsContainer = styled.div<CardsPokemonProps>`
  background: ${(props) => props.theme["white"]};
  box-shadow: 0px 0px 2px 2px ${(props) => props.theme[props.type]};
  display: flex;
  flex-direction: column;
  width: 22%;

  &:hover {
    box-shadow: 2px 2px 6px 6px ${(props) => props.theme[props.type]};
    transition: box-shadow 0.4s;
  }

  a {
    color: ${(props) => props.theme["gray-900"]};
    text-decoration: none;

    header {
      background: ${(props) => props.theme[props.type]}90;
      display: flex;
      justify-content: center;
      position: relative;

      img.background-image {
        position: absolute;
        width: 100%;
        opacity: 0.4;
        z-index: 0;
      }

      img.pokemon-image {
        z-index: 1;
        width: 100%;
      }
    }

    main {
      padding: 5px;

      p {
        margin: 0;
      }

      .number {
        color: ${(props) => props.theme["gray-500"]};
        font-size: 0.8rem;
        font-weight: 800;
      }

      .name {
        display: block;
        font-size: 2rem;
        padding: 1rem 0;
      }

      .types {
        display: flex;
        gap: 0.3rem;
        width: 100%;
      }
    }
  }
`;

interface BlockPokemonProps {
  type: keyof typeof typesPokemon;
}

export const TypePokemonBlock = styled.div<BlockPokemonProps>`
  background: ${(props) => props.theme[props.type]};
  border-radius: 5px;
  color: ${(props) => props.theme["white"]};
  display: flex;
  font-size: 0.75rem;
  justify-content: center;
  padding: 5px 2px;
  width: 22%;
  font-weight: bold;
`;

export const ContainerButtonMorePokemon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  button {
    padding: 15px 25px;
    border: none;
    background:  ${(props) => props.theme['blue-400']};
    color: ${(props) => props.theme["white"]};
    cursor: pointer;
    font-weight: bold;
    border-radius: 10px;
    font-size: 1.25rem;
  }
`
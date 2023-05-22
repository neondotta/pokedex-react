import { styled } from "styled-components";

const typesPokemon = {
    'normal': 'normal',
    'fire': 'fire',
    'water': 'water',
    'electric': 'electric',
    'grass': 'grass',
    'ice': 'ice',
    'fighting': 'fighting',
    'poison': 'poison',
    'ground': 'ground',
    'flying': 'flying',
    'psychic': 'psychic',
    'bug': 'bug',
    'rock': 'rock',
    'ghost': 'ghost',
    'dragon': 'dragon',
    'dark': 'dark',
    'steel': 'steel',
    'fairy': 'fairy'
}

interface CardsPokemonProps {
    type: keyof typeof typesPokemon
}

export const PokemonInfoContainer = styled.div<CardsPokemonProps>`
    width: 64rem;
    display flex;
    margin: 0 auto;
    padding: 20px;

    .title-block { 
        color: ${(props) => props.theme['white']};
        font-weight: bold;
        background:${(props) => props.theme[props.type]};
        margin-top: 2rem;
        font-size: 2rem;
        padding: 15px;
        box-shadow: 0px 0px 3px 4px ${(props) => props.theme[props.type]};
        border-radius: 10px 10px 0 0;
    }

    .row {
        background: ${(props) => props.theme['white']};
        box-shadow: 0px 0px 3px 4px ${(props) => props.theme[props.type]};
        border-radius: 0 0 10px 10px;
        display: flex;
        place-content: center;
        
        .chart-data {
            width: 40%;
        }
    }
`

export const PokemonResume = styled.div<CardsPokemonProps>`
    width 100%;
    display: flex;

    .image-wrapper, .resume {
        width: 50%;
    }

    .image-wrapper {
        border-top-left-radius: 12px;
        background: ${(props) => props.theme[props.type]}90;
        
        display: flex;
        justify-content: center;
        position: relative;
        height: 25rem;

        img.background-image {
            position: absolute;
            width: 100%;
            opacity: 0.4;
            z-index:0;
            height: 100%;
        }

        img.pokemon-image {
            z-index:1;
        }
    }

    .resume {
        border-top-right-radius: 12px;
        background: ${(props) => props.theme['blue-400']};
        color: ${(props) => props.theme['white']};
        padding: 15px 30px;
        display: flex;
        flex-direction: column;
        font-size: 1.25rem;

        .name {
            font-size: 2.25rem;
        }

        .number {
            margin-bottom: 5px;
            font-size: .9rem;
        }

        .feature {
            display: flex;
            flex-direction: row;

            div {
                width:50%;

                .title {
                    margin-bottom: 5px;
                }

                .value {
                    color: ${(props) => props.theme['gray-600']};
                    font-size: 1.5rem;
                    font-weight: bold;
                }
            }
        }

        .line-info {
            padding: 10px 0;
        }

        .subtitle {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .types {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }
    }
`
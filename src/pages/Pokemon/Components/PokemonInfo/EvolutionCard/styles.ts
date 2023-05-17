import { styled } from "styled-components";

export const EvolutionContainer = styled.div`
    align-items: center;
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    a {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-decoration: none;
    
        .pokemon-image {
            width: 100%;
        }
    
        .name {
            font-size: 1.5rem;
            color: #323238;
            font-weight: bold;
            padding-bottom: 10px;
        }
    }
`;
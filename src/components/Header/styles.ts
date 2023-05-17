import { styled } from "styled-components";

export const HeaderContainer = styled.header`
    align-items: center;
    background-color: ${(props) => props.theme['blue-400']};
    display: flex;
    font-size: 2rem;
    justify-content: center;
    padding: 10px 0;

    a {
        color: ${(props) => props.theme['white']};
        text-decoration: none;  
    }
`
import { styled } from "styled-components";

export const FormWrapper = styled.div`
    background: ${(props) => props.theme['gray-700']};
    display: flex;
    justify-content: center;
    padding: 1rem;

    form {
        width: 70%;
    }
`

export const FormContainer = styled.div` 
    display: flex;

    &.open {
        padding: 1.75rem 0;
        height: auto;    
    }
`

export const BaseInput = styled.input`
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme['blue-400']};
    font-weight: bold;
    font-size: 1.125rem;
    height: 2rem;
    margin-bottom: 1rem;
    padding: 1.5rem 1rem;
    width: 100%;
`

export const ButtonFormContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: right;
    padding: 5px 0;
    width: 100%;
`

export const ButtonSearchSubmit = styled.button`
    background-color: ${(props) => props.theme['blue-400']};
    border-radius: 8px;
    color: ${(props) => props.theme['white']};
    cursor: pointer;
    padding: 10px 0;
    width: 10rem;
    border: none;
`
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";

export function Header() {
    return (
        <HeaderContainer>
            <NavLink to='/'>
                Pokemon API React
            </NavLink>
        </HeaderContainer>
    )
}
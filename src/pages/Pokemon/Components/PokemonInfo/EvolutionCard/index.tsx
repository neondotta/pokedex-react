import { NavLink } from "react-router-dom";
import { EvolutionContainer } from "./styles";

interface Evolution {
  id: number;
  name: string;
  url: string;
}

interface EvolutionProps {
  data: Evolution;
}

export function EvolutionCard({ data }: EvolutionProps) {
    return (
      <EvolutionContainer>
        <NavLink to={`/pokemon/${data.name.toLowerCase()}`}>
          <img
            className="pokemon-image"
            src={data.url}
            alt=""
          />
          <div className="name">{data.name}</div>
        </NavLink>
      </EvolutionContainer>
    )
}
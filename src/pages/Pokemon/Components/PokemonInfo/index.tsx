import { PokemonInfoContainer, PokemonResume } from "./styles";

import PokeballSVG from "../../../../assets/pokeball.svg";

import { TypePokemonBlock } from "../../../Home/Components/ListPokemons/styles";
import { useContextSelector } from "use-context-selector";
import { PokemonsContext } from "../../../../context/PokemonsContext";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Radar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
} from "chart.js";
import { EvolutionCard } from "./EvolutionCard";

Chart.register(
  CategoryScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  LinearScale,
  Title
);

const optionsChart = {
  scale: {
    r: {
      min: 0,
      max: 200,
    },
  },
  backgroundColor: "rgba(48,167,215,1)",
};

export function PokemonInfo() {
  const { pokemonProfile, fetchPokemon } = useContextSelector(
    PokemonsContext,
    (context) => {
      return context;
    }
  );
	
  const { name } = useParams();

  useEffect(() => {
    if (name) {
      fetchPokemon(name);
    }
  }, [name]);

  const chartRef = useRef(null);

  if (pokemonProfile) {
    return (
      <PokemonInfoContainer type={pokemonProfile.types[0].name}>
        <PokemonResume type={pokemonProfile.types[0].name}>
          <div className="image-wrapper">
            <img
              className="pokemon-image"
              src={pokemonProfile.images.default}
              alt=""
            />
            <img src={PokeballSVG} className="background-image" alt="" />
          </div>

          <div className="resume">
            <div className="name">{pokemonProfile.name}</div>

            <div className="number">Número: #{pokemonProfile?.number}</div>

            <div className="feature line-info">
              <div>
                <p className="title">Peso:</p>{" "}
                <p className="value">
                  {pokemonProfile?.weight
                    ? Number(pokemonProfile.weight) / 10 + "kg"
                    : "Sem info"}
                </p>
              </div>
              <div>
                <p className="title">Altura:</p>{" "}
                <p className="value">
                  {pokemonProfile?.height
                    ? Number(pokemonProfile.height) / 10 + "m"
                    : "Sem info"}
                </p>
              </div>
            </div>

            <p className="subtitle">Tipo:</p>
            <div className="types">
              {pokemonProfile.types.map((currentType) => {
                return (
                  <TypePokemonBlock key={currentType.name} type={currentType.name}>
                    {currentType.name}
                  </TypePokemonBlock>
                );
              })}
            </div>

            { pokemonProfile.weakness && (
              <>
                <p className="subtitle">Fraqueza:</p>
                <div className="types">
                  {pokemonProfile.weakness.map((currentWeakness) => {
                    return (
                      <TypePokemonBlock key={currentWeakness.name} type={currentWeakness.name}>
                        {currentWeakness.name}
                      </TypePokemonBlock>
                    );
                  })}
                </div>
              </>
            )}

            { pokemonProfile.advantage && (
              <>
                <p className="subtitle">Vantagens:</p>
                <div className="types">
                  {pokemonProfile.advantage.map((currentAdvantage) => {
                    return (
                      <TypePokemonBlock key={currentAdvantage.name} type={currentAdvantage.name}>
                        {currentAdvantage.name}
                      </TypePokemonBlock>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </PokemonResume>

        <div className="title-block">
          Atributos do {pokemonProfile.name}
        </div>
        <div className="row">
          <div className="chart-data">
            <Radar
              ref={chartRef}
              data={pokemonProfile.chartAttribute}
              options={optionsChart}
            />
          </div>
        </div>

        { pokemonProfile?.evolutions != undefined && (
            <>
							<div className="title-block">Evoluções</div>
							<div className="row">
								{pokemonProfile.evolutions.map((evolution) => {
									return (<EvolutionCard data={evolution} key={evolution.id}  />);
								})}
							</div>
            </>
        )}
      </PokemonInfoContainer>
    );
  } else {
    <p>Error</p>;
  }
}

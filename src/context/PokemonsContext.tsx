import axios from "axios";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

interface Types {
  url: string;
  name: string;
}

interface Attributes {
  name: string;
  value: number;
}

interface Images {
  default: string;
  shiny?: string | null;
}

interface Evolutions {
  id: number;
  name: string;
  url: string;
}

interface ChartAttributesData {
  labels: Array<string>;
  datasets: ChartDatasets[];
}

interface ChartDatasets {
  label: string;
  data: Array<number>;
  fill: boolean;
  backgroundColor: string;
  borderWidth: number;
  borderColor?: string;
}

interface Pokemon {
  id: number;
  number: string;
  name: string;
  types: Types[];
  weakness?: Types[];
  advantage?: Types[];
  attributes: Attributes[];
  images: Images;
  height: string;
  weight: string;
  urlSpecies: string;
  evolutions?: Evolutions[];
  chartAttribute: ChartAttributesData;
}

interface PokemonsContextType {
  pokemons: Pokemon[];
  pokemonProfile?: Pokemon;
  nextUrl: string | null;
  fetchPokemons: (
    url?: string | null,
  ) => Promise<void>;
  fetchPokemon: (pokemonName: string) => void;
  isLoading: boolean;
}

interface PokemonsProviderProps {
  children: ReactNode;
}

export const PokemonsContext = createContext({} as PokemonsContextType);

export function PokemonsContextProvider({ children }: PokemonsProviderProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [pokemonProfile, setPokemonProfile] = useState<Pokemon | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPokemons = useCallback(
    async (url: string | null = null) => {
      setIsLoading(true);
      
      const setUrl = url ? url : "https://pokeapi.co/api/v2/pokemon?offset=0&limit=200";

      const { data } = await axios.get(setUrl);

      setNextUrl(data.next);

      try {
        const promises = data.results.map(({ url }: any) => axios.get(url));

        const response = await axios.all(promises);

        const pokemons = response.map((pokemon) => normalizePokemon(pokemon));

        setPokemons((state) => [ ...state, ...pokemons]);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      } finally {
        console.log("Carregou");
        setIsLoading(false);
      }
    },
    []
  );

  const normalizePokemon = ({ data }: any): Pokemon => {
    const types: Types[] = data.types?.map((type: any) => {
      return {
        name: type.type.name,
        url: type.type.url
      };
    });

    let chartAttributesData: ChartAttributesData = {
      labels: [],
      datasets: [
        {
          label: `Atributos do ${data.name}`,
          data: [],
          fill: true,
          backgroundColor: "rgba(48,167,215,1)",
          borderColor: "rgba(48,167,215,1)",
          borderWidth: 5,
        },
      ],
    };

    const attributes: Attributes[] = data.stats?.map((attribute: any) => {
      chartAttributesData.labels.push(attribute.stat.name);
      chartAttributesData.datasets[0].data.push(parseInt(attribute.base_stat));

      return {
        name: attribute.stat.name,
        value: attribute.base_stat,
      };
    });

    return {
      id: data.id,
      number: data.id.toString().padStart(3, "0"),
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      types,
      attributes,
      images: {
        default:
          data.sprites.other["official-artwork"]["front_default"] != undefined
            ? data.sprites.other["official-artwork"]["front_default"]
            : "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
              data.id.toString().padStart(3, "0") +
              ".png",
        shiny:
          data.sprites.other["official-artwork"]["front_shiny"] != undefined
            ? data.sprites.other["official-artwork"]["front_shiny"]
            : null,
      },
      height: data.height,
      weight: data.weight,
      urlSpecies: data.species.url,
      chartAttribute: chartAttributesData,
    };
  };

  const fetchPokemon = useCallback(async (name: string) => {
    setIsLoading(true);

    let currentPokemonProfile = pokemons.find(function (pokemon) {
      return pokemon.name.toLowerCase() === name;
    });

    if (currentPokemonProfile) {
      const responseEvolutionsPokemon = await getEvolutionPokemon(
        currentPokemonProfile
      );

      currentPokemonProfile.evolutions = responseEvolutionsPokemon;
      
      if(currentPokemonProfile.types.length > 0) {
        const responseWeaknessAndAdvantageType = await getWeaknessAndAdvantageType(
          currentPokemonProfile
        );

        currentPokemonProfile.weakness = responseWeaknessAndAdvantageType.weakness;
        currentPokemonProfile.advantage = responseWeaknessAndAdvantageType.advantage;
      }

      setPokemonProfile(currentPokemonProfile);

      setIsLoading(false);
      return;
    }

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );

    let pokemonData = normalizePokemon(response);

    const responseEvolutionsPokemon = await getEvolutionPokemon(pokemonData);
    pokemonData.evolutions = responseEvolutionsPokemon;
    
    if(pokemonData.types.length > 0) {
      const responseWeaknessAndAdvantageType = await getWeaknessAndAdvantageType(
        pokemonData
      );

      pokemonData.weakness = responseWeaknessAndAdvantageType.weakness;
      pokemonData.advantage = responseWeaknessAndAdvantageType.advantage;
    }

    setIsLoading(false);
    setPokemonProfile(pokemonData);
  }, []);

  const getEvolutionPokemon = async (pokemonData: Pokemon) => {
    const { data } = await axios.get(pokemonData.urlSpecies);

    const responseEvolutionsPokemon = await axios.get(data.evolution_chain.url);

    const evolutionsData = getEvolutionData([
      responseEvolutionsPokemon.data.chain,
    ]);

    return evolutionsData.map(function (item: any) {
      const splitUrl = item.url.split("/").filter(function (data: string) {
        return data;
      });

      const getPokemonId = splitUrl[splitUrl.length - 1];

      return {
        id: parseInt(getPokemonId),
        name: item.name,
        url:
          "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
          getPokemonId.toString().padStart(3, "0") +
          ".png",
      };
    });
  };

  const getEvolutionData = (data: any) => {
    return data.flatMap((item: any) => {
      if (item.evolves_to.length) {
        return [item.species, ...getEvolutionData(item.evolves_to)];
      }

      return item.species;
    });
  };

  const getWeaknessAndAdvantageType = async (pokemonData: Pokemon) => {
    const promises = pokemonData.types.map((type: Types) => axios.get(type.url));

    const response = await axios.all(promises);
    
    const double_damage_from = response.map(({ data }) => { return data.damage_relations.double_damage_from});
    const weakness = [].concat(...double_damage_from);
    const resultWeakness = weakness.filter((item, pos) => weakness.indexOf(item) === pos);

    const double_damage_to = response.map(({ data }) => { return data.damage_relations.double_damage_to});
    const advantages = [].concat(...double_damage_to);
    const resultAdvantage = advantages.filter((item, pos) => advantages.indexOf(item) === pos);

    return {
      weakness: resultWeakness, 
      advantage: resultAdvantage
    };
  };

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <PokemonsContext.Provider
      value={{
        pokemons,
        nextUrl,
        fetchPokemon,
        fetchPokemons,
        pokemonProfile,
        isLoading
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
}

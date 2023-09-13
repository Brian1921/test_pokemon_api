import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  AllPokemonsResult,
  PokemonsByTypeResult,
  PokeType,
} from "../interfaces/types";

interface ContextProps {
  types: PokeType[];
  elected: PokeType;
  pokemonsFiltered: string[] | null;
  changeTypeSelected: (type: PokeType) => void;
}

export const PokemonContext = createContext<ContextProps>({} as ContextProps);

const PokemonProvider = ({ children }: any) => {
  let allPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";

  const defaultState: PokeType = {
    name: "All",
    url: allPokemonsUrl,
  };

  const [allPokemons, setAllPokemons] = useState(null);
  const [pokemonsFiltered, setPokemonsFiltered] = useState(null);

  const [types, setTypes] = useState([defaultState]);
  const [elected, setelected] = useState(defaultState);

  const changeTypeSelected = async (type: PokeType) => {
    setelected(type);

    const { data } = await axios.get(type?.url!);
    let pokemons = data?.pokemon?.map(
      ({ pokemon }: PokemonsByTypeResult) => pokemon?.url
    );

    type.name !== "All"
      ? setPokemonsFiltered(pokemons)
      : setPokemonsFiltered(allPokemons);
  };

  const getPokemonsType = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type");
    setTypes([...types, ...data.results]);
  };

  const getAllPokemons = async () => {
    const { data } = await axios.get(allPokemonsUrl);

    let pokemons = data?.results?.map(
      (pokemon: AllPokemonsResult) => pokemon?.url
    );

    setAllPokemons(pokemons);
    setPokemonsFiltered(pokemons);
  };

  useEffect(() => {
    getPokemonsType();
    getAllPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        types,
        elected,
        pokemonsFiltered,
        changeTypeSelected,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;

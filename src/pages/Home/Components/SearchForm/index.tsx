import { useContextSelector } from "use-context-selector";
import {
  BaseInput,
  FormContainer,
  ButtonSearchSubmit,
  ButtonFormContainer,
  FormWrapper,
} from "./styles";
import { PokemonsContext } from "../../../../context/PokemonsContext";

import * as zod from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchPokemonsFormValdiationSchema = zod.object({
  name: zod.string().min(2, "Informe o nome completo do pokémon desejado"),
});

type searchPokemonsForm = zod.infer<typeof searchPokemonsFormValdiationSchema>;

export function SearchForm() {
  const { searchPokemons, fetchPokemons } = useContextSelector(
    PokemonsContext,
    (context) => {
      return context;
    }
  );

  const searchPokemonsResolver = useForm<searchPokemonsForm>({
    resolver: zodResolver(searchPokemonsFormValdiationSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, reset, register } = searchPokemonsResolver;

  function searchPokemonsData(data: searchPokemonsForm) {
    console.log("AAAAAAAAAAAAAAA", data);
    searchPokemons(data);
  }

  function resetSearchPokemon() {
    fetchPokemons();
    reset();
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(searchPokemonsData)}>
        <FormProvider {...searchPokemonsResolver}>
          <FormContainer>
            <BaseInput
              id="name"
              placeholder="Digite o nome do pokémon desejado"
              {...register("name")}
            ></BaseInput>
          </FormContainer>
        </FormProvider>

        <ButtonFormContainer>
          <ButtonSearchSubmit type="reset" onClick={resetSearchPokemon}>
            Resetar
          </ButtonSearchSubmit>
          <ButtonSearchSubmit type="submit">Pesquisar</ButtonSearchSubmit>
        </ButtonFormContainer>
      </form>
    </FormWrapper>
  );
}

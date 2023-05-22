import { ListPokemons } from "./Components/ListPokemons";
import { SearchForm } from "./Components/SearchForm";

export function Home() {
    return (
        <>
            <SearchForm />
            <ListPokemons />
        </>
    )
}
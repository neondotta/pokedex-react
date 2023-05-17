import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Pokemon } from "./pages/Pokemon";

export function Router() {
    return(
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/pokemon/:name" element={<Pokemon />}></Route>
            </Route>
        </Routes>
    )
}
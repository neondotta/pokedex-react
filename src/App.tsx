import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { PokemonsContextProvider } from './context/PokemonsContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      
      <PokemonsContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PokemonsContextProvider>
    </ThemeProvider>
  )
}

export default App

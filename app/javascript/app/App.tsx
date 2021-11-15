import { AppBar } from "@mui/material"
import React, { useState } from "react"
import AppBarMenu from "./components/AppBarMenu"
import { Provider } from "react-redux"
import store from "./reducer/store"
import GlobalStyle from "./styles/GlobalStyle"
import AppRouter from "./page/AppRouter"
const App = (props) => {
  const [name, setName] = useState(props.name)

  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <AppRouter>
          <AppBarMenu />
        </AppRouter>
      </Provider>
    </>
  )
}

export default App

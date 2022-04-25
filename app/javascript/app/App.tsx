import { AppBar } from "@mui/material"
import React, { useState } from "react"
import AppBarMenu from "./components/AppBarMenu"
import { Provider } from "react-redux"
import store from "./reducer/store"
import GlobalStyle from "./styles/GlobalStyle"
import AppRouter from "./page/AppRouter"
import Axios from "axios"

const csrfToken = document
  .querySelector("meta[name=csrf-token]")
  .getAttribute("content")
console.log("csrfToken", csrfToken)
Axios.defaults.headers.common["X-CSRF-Token"] = csrfToken

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

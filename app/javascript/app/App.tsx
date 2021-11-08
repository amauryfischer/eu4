import { AppBar } from "@mui/material"
import React, { useState } from "react"
import AppBarMenu from "./components/AppBarMenu"
import { Provider } from "react-redux"
import store from "./redux/store"
import GlobalStyle from "./styles/GlobalStyle"
const App = (props) => {
  const [name, setName] = useState(props.name)

  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <AppBarMenu />
      </Provider>
    </>
  )
}

export default App

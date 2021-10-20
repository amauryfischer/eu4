import React, { useState } from "react"

const App = (props) => {
  const [name, setName] = useState(props.name)

  return <>Hello app</>
}

export default App

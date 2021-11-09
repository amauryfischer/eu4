import { createGlobalStyle, css } from "styled-components"
import colors from "./color"

const GlobalStyle = createGlobalStyle`
:root {
      ${() => {
        let colorCss = ""
        Object.keys(colors).forEach((key) => {
          colorCss += `--${key}: ${colors[key]} !important;`
          colorCss += `--${key + "t42"}: ${colors[key] + "6b"} !important;`
          colorCss += `--${key + "t20"}: ${colors[key] + "33"} !important;`
        })
        return css`
          ${colorCss}
        `
      }}
}
a {
  text-decoration: none;
}
  body {
    margin: 0;
  }
`
export default GlobalStyle

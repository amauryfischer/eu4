"use client"
import { createGlobalStyle } from "styled-components"
import colors from "./colors"
import shadow from "./shadow"
import size from "./size"

const GlobalStyle = createGlobalStyle`
    :root {
        ${colors}
        ${size}
        --color-hue: 0;
        --color-saturation: 0%;
        --color-lightness: 0%;
        ${shadow}
    }
    * {
        &:focus {
            outline: none;
        }
    }
    body {
        height: 100vh;
        background-color: white;
    }
    
`

export default GlobalStyle

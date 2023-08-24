"use client"
import { createGlobalStyle } from "styled-components"
import colors from "./colors/colors"
import shadow from "./shadow"
import size from "./size"
import color_theme from "./colors/colors_theme"
import spacing from "./spacing"

const GlobalStyle = createGlobalStyle`
    :root {
        ${colors}
        ${color_theme}
        ${size}
        ${spacing}
        --color-hue: 0;
        --color-saturation: 0%;
        --color-lightness: 0%;
        --bold: 700;
        ${shadow}
    }
    nav {
        color: white !important;
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

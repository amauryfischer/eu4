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
    @font-face {
    font-family: 'Quantico';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
      src: url(https://fonts.gstatic.com/s/quantico/v17/rax-HiSdp9cPL3KIF7xrJD0.woff2) format('woff2');
    }
    
    nav {
        color: white !important;
    }
    * {
        &:focus {
            outline: none;
        }
        box-sizing: border-box !important;
        font-family: 'Quantico' !important;   
    }
    body {  
        height: 100vh;
        background: unset !important;
    }
    
`

export default GlobalStyle

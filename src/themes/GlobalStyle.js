import { createGlobalStyle } from 'styled-components';
import mainTheme from 'themes/mainTheme';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;     
    }

    html {
        font-size: 62.5%;
    }

    body {
        overflow-x: hidden;
        font-family: 'Open Sans', sans-serif;
        font-weight: ${mainTheme.fontWeight.normal};
        font-size: ${mainTheme.fontSize.m};
        background-color: ${mainTheme.color.backPrimary};
    }
`
export default GlobalStyle
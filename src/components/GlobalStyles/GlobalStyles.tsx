import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
    box-sizing: border-box; 
}

body {
    margin: 0; 
    padding: 0; 
    font-family: 'Jost', sans-serif;
    font-size: 16px; 
    background-color: #F7F8FD; 


h1, h2, h3, h4, h5, h6, p, ul,li {
    margin: 0; 
    padding: 0; 
}

h1 {
    font-weight: 700, 
    font-size: 24px; 
    line-height: 35px; 
    letter-spacing: -0.33px; 
}

h2 {
    font-weight: 700, 
    font-size: 20px; 
    line-height: 29px; 
    letter-spacing: -0.25px;  
}

h3 {
    font-weight: 700, 
    font-size: 18px; 
    line-height: 26px; 
    letter-spacing: -0.25px;  
}

h4 {
    font-weight: 700, 
    font-size: 13px; 
    line-height: 20px; 
    letter-spacing: -0.20px;  
}

p {
    font-weight: 400; 
    font-size: 16px; 
    line-height: 23px; 
}

li {
    list-style-type: none;
}

a {
    text-decoration: none; 
}

`;

export default GlobalStyle;

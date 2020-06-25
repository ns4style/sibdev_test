import { createGlobalStyle } from "styled-components";

export const GlobalCustomStyles = createGlobalStyle`
  * {
    font-family : Roboto;
    box-sizing : border-box;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    font-size: 1.6rem;
    background-color: #e5e5e5;
  }
  
  h1, h2, h3, h4 {
    margin : 0
  }
`;
